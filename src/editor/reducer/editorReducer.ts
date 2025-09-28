import {selectorReducer, SelectorReducerActions, SelectorReducerState} from "./selectorReducer";
import {SimulationReducerActions, SimulationReducerState, simulationReducer} from "./simulationReducer";
import {historyReducer, HistoryReducerActions, HistoryReducerState} from "./historyReducer";
import {levelReducer, LevelReducerActions, LevelReducerState} from "./levelReducer";

export type EditorReducerState =
    & SelectorReducerState
    & SimulationReducerState
    & HistoryReducerState
    & LevelReducerState

export type EditorReducerActions =
    | SelectorReducerActions
    | SimulationReducerActions
    | HistoryReducerActions
    | LevelReducerActions

const reducerOrder: ((state: EditorReducerState, action: EditorReducerActions) => EditorReducerState)[] = [
    selectorReducer,
    historyReducer,
    simulationReducer,
    levelReducer,
];

export function editorReducer(
    state: EditorReducerState,
    action: EditorReducerActions,
): EditorReducerState {
    let newState = state;

    reducerOrder.forEach(reducer  => {
        newState = {...newState, ...reducer(newState, action)};
    });

    return newState;
}