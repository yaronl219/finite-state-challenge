import { NodeTree, StateNode, StateMachineProps } from './types/types';

export class Fsm {
  private readonly onStateChange: StateMachineProps['onStateChange'];
  private readonly nodeTree: NodeTree;
  private currentState: StateNode;

  constructor({
    onStateChange,
    stateNodes,
    resolveInitialState,
  }: StateMachineProps) {
    this.onStateChange = onStateChange;
    this.nodeTree = stateNodes.reduce(
      (nodeTree, currNode) => ({
        ...nodeTree,
        [currNode.id]: currNode,
      }),
      {}
    );

    const initialState = resolveInitialState(this.nodeTree);
    this.currentState = initialState;
    this.fireOnEnterEvents();
  }

  private fireOnEnterEvents() {
    this.currentState?.onEnterState?.(this.currentState, this.nodeTree);
  }

  private fireOnStateChangeEvent() {
    this.onStateChange?.(this.currentState, this.nodeTree, this.getIsNodeFinal())
  }

  private fireOnExitEvents() {
    this.currentState?.onExitState?.(this.currentState, this.nodeTree);
  }

  private setNewState(node: StateNode) {
    this.fireOnExitEvents()
    this.currentState = node;
    this.fireOnStateChangeEvent()
    this.fireOnEnterEvents()
  }

  /** 
  advance to the next state
  @id: if there is only one state, id is optional. if id does not match possible next step, throws
  */
  public advance(id?: string): void {
    const isCurrentStateFinal = !this.currentState.nextStateIds?.length
    if (isCurrentStateFinal) {
      throw new Error(`Current state ${id} is the final state`)
    }

    if (id) {
      const isIdPossibleForNextStep = this.currentState.nextStateIds?.find(
        (_id) => id === _id
      );
      if (!isIdPossibleForNextStep) {
        throw new Error(
          `id ${id} cannot be the next state of the current state ${this.currentState.id}`
        );
      }

      if (!this.nodeTree[id]) {
        throw new Error(`id ${id} does not exist in the state machine`);
      }

      this.setNewState(this.nodeTree[id]);
      return
    }

    if (this.currentState.nextStateIds && this.currentState.nextStateIds.length > 1) {
      throw new Error(`There is more that one possible next step, but id has not been provided`)
    }

    const nextStateId = this.currentState.nextStateIds?.[0]
    const nextStateNode = nextStateId && this.nodeTree[nextStateId]

    if (!nextStateNode) {
      throw new Error(`id ${id} does not exist in the state machine`);
    }
    this.setNewState(nextStateNode)
  }

  public getCurrentState(): StateNode {
    return this.currentState
  }

  public getIsNodeFinal(): boolean {
    return !this.currentState.nextStateIds?.length
  }
 }
