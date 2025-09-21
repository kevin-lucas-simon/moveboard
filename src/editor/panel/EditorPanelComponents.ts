import React from "react";
import {StructureTypes} from "../../data/model/structure/StructureTypes";
import {EditorChunkElementsTab} from "../tabs/EditorChunkElementsTab";
import {EditorChunkInspector} from "./detail/EditorChunkInspector";
import {EditorEnvironment} from "./main/EditorEnvironment";
import {EditorEmptyPanel} from "./main/EditorEmptyPanel";
import {EditorPlayTestTab} from "../tabs/EditorPlayTestTab";

export const EditorPanel = {
    ...StructureTypes,
    TestPlay: 'TestPlay',
} as const;

export type EditorPanelTypes = typeof EditorPanel[keyof typeof EditorPanel];

export const EditorPanelComponents: Record<EditorPanelTypes, {
    overviewPanel: React.ComponentType<any>;
    detailPanel?: React.ComponentType<any>;
    mainPanel: React.ComponentType<any>;
}> = {
    [EditorPanel.TestPlay]: {
        overviewPanel: EditorPlayTestTab,
        mainPanel: EditorEnvironment,
    },
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
    },
}