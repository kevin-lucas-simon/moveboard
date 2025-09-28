import {DebugSettings} from "../../experience/debug/settings/DebugSettingsProvider";
import {EditorReducerActions, EditorReducerState} from "./editorReducer";

export type SimulationReducerState = {
    simulationSettings: DebugSettings,
}

export type SimulationReducerActions = {
    type: 'simulator_patch_settings',
    payload: Partial<DebugSettings>,
}

export function simulationReducer(
    state: EditorReducerState,
    action: EditorReducerActions,
): EditorReducerState {
    switch (action.type) {
        case 'simulator_patch_settings': {
            return {
                ...state,
                simulationSettings: {
                    ...state.simulationSettings,
                    ...action.payload,
                }
            }
        }
        default: {
            return state;
        }
    }
}