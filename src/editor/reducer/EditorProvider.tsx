import React, {createContext, useContext, useReducer, useEffect} from "react";
import {EditorID, editorReducer, EditorReducerActions, EditorReducerState} from "./editorReducer";
import {StructureTypes} from "../../data/model/structure/StructureTypes";
import {StructureModel} from "../../data/model/structure/StructureModel";
import {ChunkModel} from "../../data/model/structure/spacial/ChunkModel";
import {ElementModel} from "../../data/model/element/ElementModel";
import {filterStructures} from "../../data/factory/StructureFactory";
import {useLiveQuery} from "dexie-react-hooks";
import {localEditorDB} from "../../data/localEditorDB";

const EditorContext = createContext<EditorReducerState|null>(null);
const EditorDispatcher = createContext<React.Dispatch<EditorReducerActions>|null>(null);

export type EditorProviderProps = {
    editorID: EditorID;
    children: React.ReactNode;
}
export function EditorProvider(props: EditorProviderProps) {
    const editorState = useLiveQuery(
        () => localEditorDB.get(props.editorID),
        [props.editorID],
    );

    if (!editorState) {
        return null;
    }

    return (
        <EditorReducerProvider editorState={editorState}>
            {props.children}
        </EditorReducerProvider>
    );
}

function EditorReducerProvider(props: {
    editorState: EditorReducerState;
    children: React.ReactNode
}) {
    const[newState, dispatch] = useReducer(editorReducer, props.editorState);

    useEffect(() => {
        localEditorDB.put(newState);
    }, [newState]);

    return (
        <EditorContext.Provider value={props.editorState}>
            <EditorDispatcher.Provider value={dispatch}>
                {props.children}
            </EditorDispatcher.Provider>
        </EditorContext.Provider>
    );
}

export function useEditorContext() {
    return useContext(EditorContext);
}

export function useEditorDispatcher() {
    return useContext(EditorDispatcher);
}

export function useEditorLevel() {
    const editor = useEditorContext();
    if (!editor) {
        return null;
    }
    return editor.level;
}

export function useEditorActiveStructure<T extends StructureModel>(type?: StructureTypes): T | null {
    const editor = useEditorContext();
    if (!editor) {
        return null;
    }

    const structures = type
        ? filterStructures<T>(editor.level.structures, type)
        : editor.level.structures;

    return structures[editor.selectedStructure] as T | null;
}

export function useEditorSelectedChunkElements(): {[key: string]: ElementModel} {
    const editor = useEditorContext();
    const chunk = useEditorActiveStructure<ChunkModel>(StructureTypes.Chunk);
    if (!editor || !chunk) {
        return {};
    }

    const elements: {[key: string]: ElementModel} = {};
    editor.selectedElements.forEach(id => {
        if (chunk.elements[id]) {
            elements[id] = chunk.elements[id];
        }
    });
    return elements;
}