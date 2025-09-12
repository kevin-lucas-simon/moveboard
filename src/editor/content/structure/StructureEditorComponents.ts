import React from "react";
import {StructureTypes} from "../../../data/model/structure/StructureTypes";
import {EditorChunkElementsTab} from "../../tabs/EditorChunkElementsTab";
import {EditorChunkInspector} from "../../tabs/inspector/EditorChunkInspector";


export const StructureEditorComponents: Record<StructureTypes, {
    overviewPanel: React.ComponentType<any>;
    detailPanel?: React.ComponentType<any>;
}> = {
    [StructureTypes.Chunk]: {
        overviewPanel: EditorChunkElementsTab,
        detailPanel: EditorChunkInspector,
    },
    [StructureTypes.Unknown]: {
        overviewPanel: EditorChunkElementsTab,
    },
    [StructureTypes.Section]: {
        overviewPanel: EditorChunkElementsTab,
    }
}