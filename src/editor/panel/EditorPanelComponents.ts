import React from "react";
import {StructureTypes} from "../../data/model/structure/StructureTypes";
import {EditorChunkElementsTab} from "./chunk/EditorChunkElementsTab";
import {EditorChunkInspector} from "./chunk/EditorChunkInspector";
import {EditorEnvironment} from "./chunk/EditorEnvironment";
import {EditorEmptyPanel} from "./system/EditorEmptyPanel";
import {EditorPlayTestTab} from "./testplay/EditorPlayTestTab";

export const EditorPanelTypes = {
    ...StructureTypes,
    TestPlay: 'TestPlay', // TODO rename it to Simulation
} as const;

export type EditorPanelComponentTypes = typeof EditorPanelTypes[keyof typeof EditorPanelTypes];

export const EditorPanelComponents: Record<EditorPanelComponentTypes, {
    overviewPanel: React.ComponentType<any>;
    detailPanel?: React.ComponentType<any>;
    mainPanel: React.ComponentType<any>;
}> = {
    [EditorPanelTypes.TestPlay]: {
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