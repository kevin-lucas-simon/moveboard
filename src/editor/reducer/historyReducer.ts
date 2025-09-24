import {levelReducer, LevelReducerActions, LevelReducerState} from "./levelReducer";

const maxUndoSteps = 50;

export type HistoryReducerState = LevelReducerState & {
    previousState: LevelReducerState[],
    nextState: LevelReducerState[],
}

export type HistoryReducerActions = LevelReducerActions | {
    type: 'editor_undo',
} | {
    type: 'editor_redo',
}

export function historyReducer(
    state: HistoryReducerState,
    action: HistoryReducerActions,
): HistoryReducerState {
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
                    {
                        level: state.level,
                        active: state.active,
                    }
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
                    {
                        level: state.level,
                        active: state.active,
                    }
                ],
                nextState: state.nextState.slice(0, -1),
            };
        }
        default: {
            const newState = levelReducer(state, action);
            return {
                ...newState,
                previousState: [
                    ...state.previousState.slice(-maxUndoSteps),
                    {
                        level: state.level,
                        active: state.active,
                    }
                ],
                nextState: [],
            };
        }
    }
}


