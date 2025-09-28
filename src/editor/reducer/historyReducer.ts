import {EditorReducerActions, EditorReducerState} from "./editorReducer";

const maxUndoSteps = 50;

export type HistoryReducerState = {
    previousState: Omit<EditorReducerState, 'previousState' | 'nextState'>[],
    nextState: Omit<EditorReducerState, 'previousState' | 'nextState'>[],
}

export type HistoryReducerActions = {
    type: 'editor_undo',
} | {
    type: 'editor_redo',
}

function omitHistoryState(state: EditorReducerState): Omit<EditorReducerState, 'previousState' | 'nextState'> {
    const {
        previousState,
        nextState,
        ...stateWithoutHistory
    } = state;

    return stateWithoutHistory;
}

export function historyReducer(
    state: EditorReducerState,
    action: EditorReducerActions,
): EditorReducerState {
    switch (action.type) {
        case "editor_undo": {
            if (state.previousState.length === 0) {
                return state;
            }
            const previousState = state.previousState[state.previousState.length - 1];
            return {
                ...previousState,
                previousState: state.previousState.slice(0, -1),
                nextState: [
                    ...state.nextState,
                    omitHistoryState(state)
                ],
            };
        }
        case "editor_redo": {
            if (state.nextState.length === 0) {
                return state;
            }
            const nextState = state.nextState[state.nextState.length - 1];
            return {
                ...nextState,
                previousState: [
                    ...state.previousState,
                    omitHistoryState(state)
                ],
                nextState: state.nextState.slice(0, -1),
            };
        }
        default: {
            return {
                ...state,
                previousState: [
                    ...state.previousState.slice(-maxUndoSteps),
                    omitHistoryState(state)
                ],
                nextState: [],
            };
        }
    }
}
