import React from "react";
import {StructureTypes} from "../../data/model/structure/StructureTypes";
import {EditorChunkOverviewPanel} from "./chunk/EditorChunkOverviewPanel";
import {EditorChunkDetailPanel} from "./chunk/EditorChunkDetailPanel";
import {EditorChunkScenePanel} from "./chunk/EditorChunkScenePanel";
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
    scenePanel: React.ComponentType<any>;
}> = {
    [EditorPanelTypes.Simulation]: {
        overviewPanel: EditorSimulationOverviewPanel,
        scenePanel: EditorChunkScenePanel,
    },
    [StructureTypes.Chunk]: {
        overviewPanel: EditorChunkOverviewPanel,
        detailPanel: EditorChunkDetailPanel,
        scenePanel: EditorChunkScenePanel,
    },
    [StructureTypes.Unknown]: {
        overviewPanel: EditorChunkOverviewPanel,
        scenePanel: EditorEmptyPanel,
    },
    [StructureTypes.Section]: {
        overviewPanel: EditorChunkOverviewPanel,
        scenePanel: EditorEmptyPanel,
    },
}