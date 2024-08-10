import { useCallback, useEffect, useMemo, useState } from 'react';
import { StateMachineContext } from './StateMachineContext';
import { ActiveState } from '../../types/active-state';
import { Fsm, StateNode } from '@fsm-challenge/fsm';
import { v4 as uuidv4 } from 'uuid';

interface StateMachineProviderProps {
    children: React.ReactNode
}

export const StateMachineProvider: React.FC<StateMachineProviderProps> = ({ children }) => {
  const [stateNodes, setStateNodes] = useState<StateNode<any>[]>([
    { id: '1', name: 'woop1', nextStateIds: [] },
    { id: '2', name: 'woop2', nextStateIds: [] },
    { id: '3', name: 'woop3', nextStateIds: [] },
  ]);

  const fsm = useMemo(() => new Fsm({ stateNodes }), [stateNodes]);

  const [activeState, setActiveState] = useState<ActiveState<any> | null>(null);

  useEffect(() => {
    if (!stateNodes.length) {
        setActiveState(null)
        return
    }

    if (activeState && fsm.getStateById(activeState.id)) {
        fsm.setActiveStateById(activeState.id)
    } else if (stateNodes.length) {
        fsm.setActiveStateById(stateNodes[0]?.id)
    } 

    setActiveState({
      ...fsm.getCurrentState(),
      nextStates: fsm.getNextNodes(),
    });
  }, [setActiveState, fsm, activeState, stateNodes]);

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
        console.log('delte connection')
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

  const onSetActiveStateById = useCallback((id: string) => {
    fsm.setActiveStateById(id);
    setActiveState({
      ...fsm.getCurrentState(),
      nextStates: fsm.getNextNodes(),
    });
  }, [fsm]);

  const onRenameNode = useCallback((nodeId: string, newName: string) => {
    setStateNodes(stateNodes => {
     return stateNodes.map(stateNode => {
        if (stateNode.id === nodeId) {
            return {
                ...stateNode,
                name: newName
            }
        }
        return stateNode
     })
    })
  }, []);

  const onRemoveNode = useCallback((id: string) => {
    setStateNodes(stateNodes => stateNodes.filter(node => node.id !== id))
  }, [])

  return (
    <StateMachineContext.Provider
      value={{
        activeState,
        onSetActiveStateById,
        onAdvanceStep,
        onCreateNode,
        onDeleteConnection,
        onConnectSteps,
        fsm,
        stateNodes,
        onRemoveNode,
        onRenameNode
      }}
    >
      {children}
    </StateMachineContext.Provider>
  );
};
