import { NodeTree, StateNode, StateMachineProps } from './types/types';

export class Fsm<T> {
  private readonly onStateChange: StateMachineProps<T>['onStateChange'];
  private readonly nodeTree: NodeTree<T>;
  private readonly stateNodes: StateNode<T>[]
  private currentState: StateNode<T>;

  constructor({
    onStateChange,
    stateNodes,
    resolveInitialState,
  }: StateMachineProps<T>) {
    this.onStateChange = onStateChange;
    this.stateNodes = stateNodes
    this.nodeTree = stateNodes.reduce(
      (nodeTree, currNode) => ({
        ...nodeTree,
        [currNode.id]: currNode,
      }),
      {}
    );
    if (resolveInitialState) {
      this.currentState = resolveInitialState(this.nodeTree);
    } else {
      this.currentState = stateNodes[0]
    }
     
    this.fireOnEnterEvents();
  }

  private fireOnEnterEvents() {
    this.currentState?.onEnterState?.(
      this.currentState,
      (id) => this.advance(id),
      this.nodeTree
    );
  }

  private fireOnStateChangeEvent() {
    this.onStateChange?.(
      this.currentState,
      this.nodeTree,
      this.getIsNodeFinal()
    );
  }

  private fireOnExitEvents() {
    this.currentState?.onExitState?.(
      this.currentState,
      (id) => this.advance(id),
      this.nodeTree
    );
  }

  private setNewState(node: StateNode<T>) {
    this.fireOnExitEvents();
    this.currentState = node;
    this.fireOnStateChangeEvent();
    this.fireOnEnterEvents();
  }

  public setActiveStateById(id: string) {
    if (!this.nodeTree[id]) {
      throw new Error(`id ${id} does not exist in the state machine`);
    }

    this.setNewState(this.nodeTree[id]);
  }

  /** 
  advance to the next state
  @id: if there is only one state, id is optional. if id does not match possible next step, throws
  */
  public advance(id?: string): void {
    const isCurrentStateFinal = !this.currentState.nextStateIds?.length;
    if (isCurrentStateFinal) {
      throw new Error(`Current state ${id} is the final state`);
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
      return;
    }

    if (
      this.currentState.nextStateIds &&
      this.currentState.nextStateIds.length > 1
    ) {
      throw new Error(
        `There is more that one possible next step, but id has not been provided`
      );
    }

    const nextStateId = this.currentState.nextStateIds?.[0];
    const nextStateNode = nextStateId && this.nodeTree[nextStateId];

    if (!nextStateNode) {
      throw new Error(`id ${id} does not exist in the state machine`);
    }
    this.setNewState(nextStateNode);
  }

  public getCurrentState(): StateNode<T> {
    return this.currentState;
  }

  public getIsNodeFinal(): boolean {
    return !this.currentState.nextStateIds?.length;
  }

  public getStateNodes(): StateNode<T>[] {
      return this.stateNodes
  }

  public getNextNodes(): StateNode<T>[] {
    if (!this.currentState.nextStateIds) {
      return []
    }
    return this.currentState.nextStateIds.map(id => this.nodeTree[id]).filter(Boolean)
  }

  public getStateById(id: string) {
    return this.nodeTree[id]
  }
}
