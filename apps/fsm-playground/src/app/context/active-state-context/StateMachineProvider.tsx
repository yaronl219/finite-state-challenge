import { useCallback, useEffect, useMemo, useState } from 'react';
import { StateMachineContext } from './StateMachineContext';
import { ActiveState } from '../../types/active-state';
import { Fsm, StateNode } from '@fsm-challenge/fsm';
import { v4 as uuidv4 } from 'uuid';
import { isEqual } from 'lodash';

interface StateMachineProviderProps {
  children: React.ReactNode;
}

const munchkinFsm: StateNode<any>[] = [
  {
    id: '1',
    name: 'Start',
    nextStateIds: [
      { id: '2', action: 'm' },
      { id: 'error', action: 'not m' },
    ],
  },
  {
    id: '2',
    name: 'm found',
    nextStateIds: [
      { id: '3', action: 'u' },
      { id: 'error', action: 'not u' },
    ],
  },
  {
    id: '3',
    name: 'u found',
    nextStateIds: [
      { id: '4', action: 'n' },
      { id: 'error', action: 'not n' },
    ],
  },
  {
    id: '4',
    name: 'n found',
    nextStateIds: [
      { id: '5', action: 'c' },
      { id: 'error', action: 'not c' },
    ],
  },
  {
    id: '5',
    name: 'c found',
    nextStateIds: [
      { id: '6', action: 'h' },
      { id: 'error', action: 'not h' },
    ],
  },
  {
    id: '6',
    name: 'c found',
    nextStateIds: [
      { id: '7', action: 'k' },
      { id: 'error', action: 'not k' },
    ],
  },
  {
    id: '7',
    name: 'k found',
    nextStateIds: [
      { id: '8', action: 'i' },
      { id: 'error', action: 'not i' },
    ],
  },
  {
    id: '8',
    name: 'i found',
    nextStateIds: [
      { id: '9', action: 'n' },
      { id: 'error', action: 'not n' },
    ],
  },
  {
    id: '9',
    name: 'Success',
    nextStateIds: [],
  },
  {
    id: 'error',
    name: 'error',
  },
];

const dogFsm: StateNode<any>[] = [
  {
    id: '1',
    name: 'dog eating',
    nextStateIds: [{ id: '2', action: 'Feed the dog' }],
  },
  {
    id: '2',
    name: 'dog hungry',
    nextStateIds: [{ id: '1', action: 'Dog finished eating' }],
  },
];

export const StateMachineProvider: React.FC<StateMachineProviderProps> = ({
  children,
}) => {
  const [stateNodes, setStateNodes] = useState<StateNode<any>[]>(munchkinFsm);

  const fsm = useMemo(() => new Fsm({ stateNodes }), [stateNodes]);

  const [activeState, setActiveState] = useState<ActiveState<any> | null>(null);

  useEffect(() => {
    if (!stateNodes.length) {
      setActiveState(null);
      return;
    }

    if (
      isEqual(
        { id: activeState?.id, nextStateIds: activeState?.nextStateIds },
        {
          id: fsm.getCurrentState().id,
          nextStateIds: fsm.getCurrentState().nextStateIds,
        }
      )
    ) {
      return;
    }

    if (activeState && fsm.getStateById(activeState.id)) {
      fsm.setActiveStateById(activeState.id);
    } else if (stateNodes.length) {
      fsm.setActiveStateById(stateNodes[0]?.id);
    }

    console.log('render');
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
            const newConnection = { id: targetId, action: '' };
            if (!stateNode.nextStateIds?.length) {
              return {
                ...stateNode,
                nextStateIds: [newConnection],
              };
            }

            const nextStateIdsMap = stateNode.nextStateIds.reduce<
              Record<string, { id: string; action?: string }>
            >(
              (map, cur) => ({
                ...map,
                [cur.id]: cur,
              }),
              {}
            );

            nextStateIdsMap[targetId] = newConnection;

            return {
              ...stateNode,
              nextStateIds: Object.values(nextStateIdsMap),
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
      console.log({ sourceId, targetId });
      setStateNodes((stateNodes) =>
        stateNodes.map((stateNode) => {
          if (stateNode.id === sourceId) {
            const nextStateIds = stateNode.nextStateIds?.filter(
              ({ id }) => id !== targetId
            );
            return {
              ...stateNode,
              nextStateIds,
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

  const onSetActiveStateById = useCallback(
    (id: string) => {
      fsm.setActiveStateById(id);
      setActiveState({
        ...fsm.getCurrentState(),
        nextStates: fsm.getNextNodes(),
      });
    },
    [fsm]
  );

  const onRenameNode = useCallback((nodeId: string, newName: string) => {
    setStateNodes((stateNodes) => {
      return stateNodes.map((stateNode) => {
        if (stateNode.id === nodeId) {
          return {
            ...stateNode,
            name: newName,
          };
        }
        return stateNode;
      });
    });
  }, []);

  const onRemoveNode = useCallback((id: string) => {
    setStateNodes((stateNodes) => stateNodes.filter((node) => node.id !== id));
  }, []);

  const onRenameAction = useCallback(
    (sourceId: string, targetId: string, newName: string) => {
      setStateNodes((stateNodes) =>
        stateNodes.map((stateNode) => {
          if (stateNode.id === sourceId) {
            return {
              ...stateNode,
              nextStateIds: stateNode.nextStateIds?.map((nextState) => {
                if (nextState.id === targetId) {
                  return {
                    id: nextState.id,
                    action: newName,
                  };
                }
                return nextState;
              }),
            };
          }
          return stateNode;
        })
      );
    },
    []
  );

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
        onRenameNode,
        onRenameAction,
      }}
    >
      {children}
    </StateMachineContext.Provider>
  );
};
