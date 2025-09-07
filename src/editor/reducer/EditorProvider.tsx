import React, {createContext, useContext, useReducer} from "react";
import {editorReducer, EditorReducerActions, EditorReducerState} from "./editorReducer";
import {LevelModel} from "../../data/model/world/LevelModel";

const EditorContext = createContext<EditorReducerState|null>(null);
const EditorDispatcher = createContext<React.Dispatch<EditorReducerActions>|null>(null);

export type EditorProviderProps = {
    initial: LevelModel;
    children: React.ReactNode;
}
export function EditorProvider(props: EditorProviderProps) {
    const[editor, dispatch] = useReducer(editorReducer, {
        level: props.initial,
        active: props.initial.start,
        selectedStructures: [],
        selectedElements: [],
        errors: [],
    });

    return (
        <EditorContext.Provider value={editor}>
            <EditorDispatcher.Provider value={dispatch}>
                {props.children}
            </EditorDispatcher.Provider>
        </EditorContext.Provider>
    );
}

export function useEditorContext() {
    return useContext(EditorContext);
}

export function useEditorActions() {
    return useContext(EditorDispatcher);
}
