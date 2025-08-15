import {UUID} from "../../data/model/shared/UUID";
import React from "react";
import {EditorReducerActions} from "../reducer/editorReducer";
import {EditorChunkInspector} from "./EditorChunkInspector";
import {ChunkModel} from "../../data/model/world/ChunkModel";
import {EditorElementInspector} from "./EditorElementInspector";
import {LevelModel} from "../../data/model/world/LevelModel";

export type EditorInspectorTabProps = {
    level: LevelModel;
    chunk: ChunkModel;
    dispatcher: React.Dispatch<EditorReducerActions>;
    selected: UUID[];
}

export function EditorInspectorTab(props: EditorInspectorTabProps) {
    const selectedElement = props.selected[0] ? props.chunk.elements[props.selected[0]] : undefined;

    if (selectedElement) {
        return <EditorElementInspector
            level={props.level}
            chunk={props.chunk}
            selected={props.selected}
            dispatcher={props.dispatcher}
        />;
    }

    return <EditorChunkInspector
        level={props.level}
        chunk={props.chunk}
        dispatcher={props.dispatcher}
    />;
}
