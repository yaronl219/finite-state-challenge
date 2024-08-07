export type NodeTree = Record<string, StateNode>
export interface StateNode {
    id: string;
    name?: string
    onEnterState?: (node: StateNode, nodeTree: NodeTree) => void 
    onExitState?: (node: StateNode, nodeTree: NodeTree) => void 
    nextStateIds?: string[]
}

export interface StateMachineProps {
    stateNodes: StateNode[],
    onStateChange?: (node: StateNode, nodeTree: NodeTree, isComplete: boolean) => void
    resolveInitialState: (nodeTree: NodeTree) => StateNode
}