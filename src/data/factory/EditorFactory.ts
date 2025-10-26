import {EditorReducerState} from "../../editor/reducer/editorReducer";
import {createUUID} from "./UuidFactory";
import {createLevel} from "../model/world/LevelModel";
import {DebugSettingsDefault} from "../../experience/debug/settings/DebugSettingsProvider";

export function createEditorReducerState(): EditorReducerState {
    const id = createUUID();
    const level = createLevel();

    return {
        id: id,
        level: level,
        selectedStructure: level.start,
        selectedElements: [],
        simulationSettings: DebugSettingsDefault,
        previousState: [],
        nextState: [],
        errors: [],
    }
}