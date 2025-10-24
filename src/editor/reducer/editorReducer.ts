import {selectorReducer, SelectorReducerActions, SelectorReducerState} from "./partial/selectorReducer";
import {SimulationReducerActions, SimulationReducerState, simulationReducer} from "./partial/simulationReducer";
import {historyReducer, HistoryReducerActions, HistoryReducerState} from "./partial/historyReducer";
import {levelReducer, LevelReducerActions, LevelReducerState} from "./partial/levelReducer";
import {localEditorDB} from "../../data/localEditorDB";
import {UUID} from "../../data/model/UUID";

export type EditorID = UUID;

export type EditorReducerState =
    {
        id: EditorID, // TODO own file
    }
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

    // TODO hier einen timestamp vergleichen und nur bei änderung speichern?
    localEditorDB.put(newState)

    return state;
}