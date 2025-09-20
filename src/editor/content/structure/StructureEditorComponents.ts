import React from "react";
import {StructureTypes} from "../../../data/model/structure/StructureTypes";
import {EditorChunkElementsTab} from "../../tabs/EditorChunkElementsTab";
import {EditorChunkInspector} from "../../tabs/inspector/EditorChunkInspector";
import {EditorEnvironment} from "../../tabs/mainPanel/EditorEnvironment";
import {EditorEmptyPanel} from "../../tabs/mainPanel/EditorEmptyPanel";


export const StructureEditorComponents: Record<StructureTypes, {
    overviewPanel: React.ComponentType<any>;
    detailPanel?: React.ComponentType<any>;
    mainPanel: React.ComponentType<any>;
}> = {
    [StructureTypes.Chunk]: {
        overviewPanel: EditorChunkElementsTab,
        detailPanel: EditorChunkInspector,
        mainPanel: EditorEnvironment,
    },
    [StructureTypes.Unknown]: {
        overviewPanel: EditorChunkElementsTab,
        mainPanel: EditorEmptyPanel,
    },
    [StructureTypes.Section]: {
        overviewPanel: EditorChunkElementsTab,
        mainPanel: EditorEmptyPanel,
    }
}