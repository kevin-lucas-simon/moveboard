import {SimulationSettings} from "../../../experience/debug/settings/SimulationSettingsProvider";
import {EditorReducerActions, EditorReducerState} from "../editorReducer";

export type SimulationReducerState = {
    simulationSettings: SimulationSettings,
}

export type SimulationReducerActions = {
    type: 'simulator_patch_settings',
    payload: Partial<SimulationSettings>,
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