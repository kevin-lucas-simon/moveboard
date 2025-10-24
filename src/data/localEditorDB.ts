import Dexie, {EntityTable} from 'dexie'
import {EditorID, EditorReducerState} from "../editor/reducer/editorReducer";
import {LevelModel} from "./model/world/LevelModel";
import {DebugSettingsDefault} from "../experience/debug/settings/DebugSettingsProvider";
import {createUUID} from "./factory/UuidFactory";

const dexieDB = new Dexie('editor') as Dexie & {
    editorStates: EntityTable<EditorReducerState, "id">;
}

dexieDB.version(1).stores({
    editorStates: 'id',
});

export const localEditorDB = {
    async list(): Promise<EditorReducerState[]> {
        return await dexieDB.editorStates.toArray();
    },
    async create(levelModel: LevelModel): Promise<EditorReducerState> {
        // TODO default in eigene Datei auslagern
        const newEditorState: EditorReducerState = {
            id: createUUID(),
            level: levelModel,
            selectedStructure: levelModel.start,
            selectedElements: [],
            simulationSettings: DebugSettingsDefault,
            previousState: [],
            nextState: [],
            errors: [],
        };
        await dexieDB.editorStates.add(newEditorState);
        return newEditorState;
    },
    async get(editorID?: EditorID): Promise<EditorReducerState|undefined> {
        return editorID
            ? await dexieDB.editorStates.get(editorID)
            : undefined
        ;
    },
    async put(editorState: EditorReducerState): Promise<EditorID> {
        return await dexieDB.editorStates.put(editorState) as unknown as Promise<EditorID>;
    },
    async delete(editorID: EditorID): Promise<void> {
        return await dexieDB.editorStates.delete(editorID);
    }
}