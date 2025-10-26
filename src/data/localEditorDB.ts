import Dexie, {EntityTable} from 'dexie'
import {EditorID, EditorReducerState} from "../editor/reducer/editorReducer";
import {LevelModel} from "./model/world/LevelModel";
import {createEditorReducerState} from "./factory/EditorFactory";

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
    async create(levelModel: LevelModel): Promise<EditorID> {
        return await dexieDB.editorStates.add(
            createEditorReducerState(levelModel)
        );
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