import React from "react";
import {StructureTypes} from "../../data/model/structure/StructureTypes";
import {EditorChunkElementsTab} from "./chunk/EditorChunkElementsTab";
import {EditorChunkInspector} from "./chunk/EditorChunkInspector";
import {EditorEnvironment} from "./chunk/EditorEnvironment";
import {EditorEmptyPanel} from "./system/EditorEmptyPanel";
import {EditorSimulationOverviewPanel} from "./simulation/EditorSimulationOverviewPanel";

export const EditorPanelTypes = {
    ...StructureTypes,
    Simulation: 'Simulation',
} as const;

export type EditorPanelComponentTypes = typeof EditorPanelTypes[keyof typeof EditorPanelTypes];

export const EditorPanelComponents: Record<EditorPanelComponentTypes, {
    overviewPanel: React.ComponentType<any>;
    detailPanel?: React.ComponentType<any>;
    mainPanel: React.ComponentType<any>;
}> = {
    [EditorPanelTypes.Simulation]: {
        overviewPanel: EditorSimulationOverviewPanel,
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