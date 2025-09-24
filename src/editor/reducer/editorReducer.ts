import {selectorReducer, SelectorReducerActions, SelectorReducerState} from "./selectorReducer";

export type EditorReducerState = SelectorReducerState

export type EditorReducerActions = SelectorReducerActions;

export function editorReducer(
    state: EditorReducerState,
    action: EditorReducerActions,
): EditorReducerState {
    // TODO we work on combined reducers here

    return selectorReducer(state, action);
}