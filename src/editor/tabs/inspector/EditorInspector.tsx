import {UUID} from "../../../data/model/util/UUID";
import React from "react";
import {EditorReducerActions} from "../../reducer/editorReducer";
import {EditorChunkInspector} from "./EditorChunkInspector";
import {EditorElementInspector} from "./EditorElementInspector";
import {LevelModel} from "../../../data/model/world/LevelModel";

import {ChunkModel} from "../../../data/model/structure/spacial/ChunkModel";

export type EditorInspectorTabProps = {
    level: LevelModel;
    chunk: ChunkModel;
    dispatcher: React.Dispatch<EditorReducerActions>;
    selected: UUID[];
}

export function EditorInspector(props: EditorInspectorTabProps) {
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
