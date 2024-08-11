import { StateNode } from "@fsm-challenge/fsm";
import { SavedStateMacineMinified } from "./saved-state-machine-minified";

export interface SavedStateMacine extends SavedStateMacineMinified {
    fsm: StateNode<any>[]
}