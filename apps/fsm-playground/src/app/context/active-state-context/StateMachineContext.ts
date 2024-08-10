import React, { useContext } from 'react';
import { ActiveState } from '../../types/active-state';
import { Fsm, StateNode } from '@fsm-challenge/fsm';

interface IStateMachineContext {
  activeState: null | ActiveState<any>;
  onSetActiveStateById: (id: string) => void;
  onAdvanceStep: (id?: string) => void;
  onCreateNode: () => void;
  onDeleteConnection: (sourceId: string, targetId: string) => void;
  onConnectSteps: (sourceId: string, targetId: string) => void;
  stateNodes: StateNode<any>[];
  onRenameNode: (nodeId: string, newName: string) => void;
  onRemoveNode: (nodeId: string) => void
  fsm: Fsm<any>;
}

export const StateMachineContext = React.createContext<IStateMachineContext>({
  activeState: null,
  onSetActiveStateById: () => undefined,
  onAdvanceStep: () => undefined,
  onCreateNode: () => undefined,
  onDeleteConnection: () => undefined,
  onConnectSteps: () => undefined,
  stateNodes: [],
  onRenameNode: () => undefined,
  onRemoveNode: () => undefined,
  fsm: new Fsm({ stateNodes: [] }),
});

export const useStateMachineContext = () => useContext(StateMachineContext);
