import React, { useContext } from 'react';
import { ActiveState } from '../../types/active-state';
import { Fsm, StateNode } from '@fsm-challenge/fsm';
import { SavedStateMacine } from '../../types/saved-state-machine';

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
  onRenameAction: (sourceId: string, targetId: string, newName: string) => void
  fsm: Fsm<any>;
  fetchAndSetSavedStateMachine: (id: string) => Promise<void>
  savedStateMachineId: string,
  savedStateMachineName: string
  onSaveStateMachine: () => Promise<SavedStateMacine>
  onChangeSavedStateMachineName: (newName: string) => void
  onCreateNew: () => void
}

// overriden
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
  onRenameAction: () => undefined,
  fetchAndSetSavedStateMachine: () => Promise.resolve(),
  savedStateMachineId: '',
  savedStateMachineName: '',
  onChangeSavedStateMachineName: () => undefined,
  onSaveStateMachine: () => Promise.resolve({id: '', name: '', fsm: []}),
  fsm: new Fsm({ stateNodes: [] }),
  onCreateNew: () => undefined
});

export const useStateMachineContext = () => useContext(StateMachineContext);
