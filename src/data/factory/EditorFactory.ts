import {EditorReducerState} from "../../editor/reducer/editorReducer";
import {createUUID} from "./UuidFactory";
import {createLevel, LevelModel} from "../model/world/LevelModel";
import {DebugSettingsDefault} from "../../experience/debug/settings/DebugSettingsProvider";

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
        simulationSettings: DebugSettingsDefault,
        previousState: [],
        nextState: [],
        errors: [],
        updatedAt: Date.now(),
    }
}