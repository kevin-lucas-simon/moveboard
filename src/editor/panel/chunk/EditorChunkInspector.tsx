import React from "react";
import {EditorChunkGeneralInspector} from "./partial/EditorChunkGeneralInspector";
import {EditorChunkElementInspector} from "./partial/EditorChunkElementInspector";

import {ChunkModel} from "../../../data/model/structure/spacial/ChunkModel";
import {
    useEditorActions,
    useEditorLevel,
    useEditorActiveStructure,
    useEditorSelectedChunkElements
} from "../../reducer/EditorProvider";
import {StructureTypes} from "../../../data/model/structure/StructureTypes";

export function EditorChunkInspector() {
    const dispatcher = useEditorActions();
    const level = useEditorLevel();
    const chunk = useEditorActiveStructure<ChunkModel>(StructureTypes.Chunk);
    const selectedElements = useEditorSelectedChunkElements();

    if (!dispatcher || !level || !chunk || !selectedElements) {
        return <></>;
    }

    const selectedElement = selectedElements[Object.keys(selectedElements)[0]];
    if (selectedElement) {
        return <EditorChunkElementInspector
            dispatcher={dispatcher}
            level={level}
            chunk={chunk}
            element={selectedElement}
        />;
    }

    return <EditorChunkGeneralInspector
        level={level}
        chunk={chunk}
        dispatcher={dispatcher}
    />;
}
