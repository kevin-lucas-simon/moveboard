import {EditorReducerState} from "../../editor/reducer/editorReducer";
import {createUUID} from "./UuidFactory";
import {createLevel, LevelModel} from "../model/world/LevelModel";
import {SimulationSettingsDefault} from "../../experience/debug/settings/SimulationSettingsProvider";

export function createEditorReducerState(
    levelModel?: LevelModel,
): EditorReducerState {
    const id = createUUID();
    const level = levelModel ?? createLevel();

    return {
        id: id,
        level: level,
        selectedStructure: level.start,
        selectedElements: [],
        simulationSettings: SimulationSettingsDefault,
        previousState: [],
        nextState: [],
        updatedAt: Date.now(),
    }
}