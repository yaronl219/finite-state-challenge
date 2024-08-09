export type NodeTree<T> = Record<string, StateNode<T>>

export type OnChangeStateEvent<T> = (node: StateNode<T>, advance: (id?: string) => void, nodeTree: NodeTree<T>) => void 

export interface StateNode<T> {
    id: string;
    name?: string
    onEnterState?: OnChangeStateEvent<T>
    onExitState?: OnChangeStateEvent<T>
    nextStateIds?: string[]
    data?: T
}

export interface StateMachineProps<T> {
    stateNodes: StateNode<T>[],
    onStateChange?: (node: StateNode<T>, nodeTree: NodeTree<T>, isComplete: boolean) => void
    resolveInitialState?: (nodeTree: NodeTree<T>) => StateNode<T>
}