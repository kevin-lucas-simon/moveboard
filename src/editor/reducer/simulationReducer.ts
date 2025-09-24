import {DebugSettings} from "../../experience/debug/settings/DebugSettingsProvider";
import {historyReducer, HistoryReducerActions, HistoryReducerState} from "./historyReducer";

export type SimulationReducerState = HistoryReducerState & {
    simulationSettings: DebugSettings,
}

export type SimulationReducerActions = HistoryReducerActions | {
    type: 'simulator_patch_settings',
    payload: Partial<DebugSettings>,
}

export function simulationReducer(
    state: SimulationReducerState,
    action: SimulationReducerActions,
): SimulationReducerState {
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
            return {
                ...historyReducer(state, action),
                simulationSettings: state.simulationSettings,
            }
        }
    }
}