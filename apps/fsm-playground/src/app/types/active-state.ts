import { StateNode } from "@fsm-challenge/fsm";

export interface ActiveState<T = undefined> extends StateNode<T> {
    nextStates: StateNode<T>[]
}