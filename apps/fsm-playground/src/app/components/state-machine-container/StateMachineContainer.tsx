import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Fsm, type StateNode } from '@fsm-challenge/fsm';

import styled from 'styled-components';
import { ActiveState } from '../../types/active-state';
import { StatePlayerContainer } from '../state-player/StatePlayerContainer';
import { ActiveStateContext } from '../../context/ActiveStateContext';
import { v4 as uuidv4 } from 'uuid';
import { RightPane } from './RightPane';

export const StateMachineContainer = () => {
  const [stateNodes, setStateNodes] = useState<StateNode<any>[]>([
    { id: '1', name: 'woop1', nextStateIds: [] },
    { id: '2', name: 'woop2', nextStateIds: [] },
    { id: '3', name: 'woop3', nextStateIds: [] },
  ]);

  const fsm = useMemo(() => new Fsm({ stateNodes }), [stateNodes]);

  const [activeState, setActiveState] = useState<ActiveState<any>>({
    ...fsm.getCurrentState(),
    nextStates: fsm.getNextNodes(),
  });

  useEffect(() => {
    setActiveState({
      ...fsm.getCurrentState(),
      nextStates: fsm.getNextNodes(),
    });
  }, [setActiveState, fsm]);

  const onConnectSteps = useCallback(
    (sourceId: string, targetId: string) => {
      setStateNodes((stateNodes) =>
        stateNodes.map((stateNode) => {
          if (stateNode.id === sourceId) {
            const nextStateIdsSet = new Set(stateNode.nextStateIds ?? []);
            nextStateIdsSet.add(targetId);
            return {
              ...stateNode,
              nextStateIds: Array.from(nextStateIdsSet),
            };
          }
          return stateNode;
        })
      );
    },
    [setStateNodes]
  );

  const onDeleteConnection = useCallback(
    (sourceId: string, targetId: string) => {
      setStateNodes((stateNodes) =>
        stateNodes.map((stateNode) => {
          if (stateNode.id === sourceId) {
            const nextStateIdsSet = new Set(stateNode.nextStateIds ?? []);
            nextStateIdsSet.delete(targetId);
            return {
              ...stateNode,
              nextStateIds: Array.from(nextStateIdsSet),
            };
          }
          return stateNode;
        })
      );
    },
    [setStateNodes]
  );

  const onCreateNode = useCallback(() => {
    const newNode: StateNode<any> = {
      id: uuidv4(),
      name: 'New state',
      nextStateIds: [],
    };

    setStateNodes((stateNodes) => [...stateNodes, newNode]);
  }, [setStateNodes]);

  const onAdvanceStep = useCallback(
    (id?: string) => {
      fsm.advance(id);
      setActiveState({
        ...fsm.getCurrentState(),
        nextStates: fsm.getNextNodes(),
      });
    },
    [setActiveState, fsm]
  );

  useEffect(() => {
    // onAdvanceStep();
  }, [fsm, onAdvanceStep]);

  return (
    <StyledContainer>
      <ActiveStateContext.Provider value={activeState.id}>
        <StatePlayerContainer
          activeState={activeState}
          onClickNextState={onAdvanceStep}
        />
        <RightPane
          onConnectEdge={onConnectSteps}
          onRemoveConnection={onDeleteConnection}
          fsm={fsm}
          onCreateNewNode={onCreateNode}
        />
      </ActiveStateContext.Provider>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
