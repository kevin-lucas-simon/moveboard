import Dexie, {EntityTable} from 'dexie'
import {EditorID, EditorReducerState} from "../editor/reducer/editorReducer";
import {LevelModel} from "./model/world/LevelModel";
import {createEditorReducerState} from "./factory/EditorFactory";

const dexieDB = new Dexie('Moveboard') as Dexie & {
    editorStates: EntityTable<EditorReducerState, "id">;
}

dexieDB.version(1).stores({
    editorStates: 'id,updatedAt',
});

export const localEditorDB = {
    async list(): Promise<EditorReducerState[]> {
        return await dexieDB.editorStates.orderBy('updatedAt').reverse().toArray();
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

dexieDB.use({
    stack: "dbcore",
    name: "TimestampMiddleware",
    create (downlevelDatabase) {
        return {
            ...downlevelDatabase,
            table (tableName) {
                const downlevelTable = downlevelDatabase.table(tableName);
                return {
                    ...downlevelTable,
                    mutate: request => {
                        if ((request.type === 'add' || request.type === 'put' ) && Array.isArray(request.values)) {
                            request.values = request.values.map((value) => {
                                const updatedValue = { ...value };
                                updatedValue.updatedAt = Date.now();
                                return updatedValue;
                            });
                        }
                        return downlevelTable.mutate(request);
                    }
                }
            }
        };
    }
})