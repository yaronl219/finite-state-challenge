import { useCallback, useEffect, useMemo, useState } from 'react';
import { StateMachineContext } from './StateMachineContext';
import { ActiveState } from '../../types/active-state';
import { Fsm, StateNode } from '@fsm-challenge/fsm';
import { v4 as uuidv4 } from 'uuid';
import { isEqual } from 'lodash';
import { fsmService } from '../../services/fsmService';

interface StateMachineProviderProps {
  children: React.ReactNode;
}

export const StateMachineProvider: React.FC<StateMachineProviderProps> = ({
  children,
}) => {
  const [stateNodes, setStateNodes] = useState<StateNode<any>[]>([]);

  const fsm = useMemo(() => new Fsm({ stateNodes }), [stateNodes]);

  const [activeState, setActiveState] = useState<ActiveState<any> | null>(null);

  const [savedStateMachineId, setSavedStateMachineId] = useState<string>('')
  const [savedStateMachineName, setSavedMachineName] = useState<string>('')

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

  const fetchAndSetSavedStateMachine = useCallback(async (id: string) => {
    const savedFsm = await fsmService.getFsmById(id);
    if (!savedFsm) {
        throw new Error('Could not find state machine for given ID')
    }
    setSavedStateMachineId(id)
    setSavedMachineName(savedFsm.name)
    setStateNodes(savedFsm.fsm)
  }, [setStateNodes]);

  const onChangeSavedStateMachineName = useCallback((newName: string) => {
    setSavedMachineName(newName)
  }, [setSavedMachineName])

  const onSaveStateMachine = useCallback(async () => {
    const updateObject = {name: savedStateMachineName || 'Unnamed state machine', fsm: stateNodes}
    if (savedStateMachineId) {
        return await fsmService.updateFsm(savedStateMachineId, updateObject)
    }
    const res = await fsmService.createNewFsm(updateObject)
    setSavedStateMachineId(res.id)
    return res
  }, [savedStateMachineId, savedStateMachineName, stateNodes])

  const onCreateNew = useCallback(() => {
    setActiveState(null)
    setStateNodes([])
    setSavedStateMachineId('')
    setSavedMachineName('')
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
        onRenameNode,
        onRenameAction,
        fetchAndSetSavedStateMachine,
        savedStateMachineId,
        savedStateMachineName,
        onChangeSavedStateMachineName,
        onSaveStateMachine,
        onCreateNew
      }}
    >
      {children}
    </StateMachineContext.Provider>
  );
};
