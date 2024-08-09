import { StateNode } from "@fsm-challenge/fsm";

export interface ActiveState<T> extends StateNode<T> {
    nextStates: StateNode<T>[]
}