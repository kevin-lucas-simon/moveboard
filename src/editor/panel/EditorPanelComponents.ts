import React from "react";
import {StructureTypes} from "../../data/model/structure/StructureTypes";
import {EditorChunkOverviewPanel} from "./chunk/EditorChunkOverviewPanel";
import {EditorChunkDetailPanel} from "./chunk/EditorChunkDetailPanel";
import {EditorChunkScenePanel} from "./chunk/EditorChunkScenePanel";
import {EditorEmptyPanel} from "./system/EditorEmptyPanel";
import {EditorSimulationOverviewPanel} from "./simulation/EditorSimulationOverviewPanel";
import {EditorPanelComponentTypes, EditorPanelTypes} from "./EditorPanelTypes";
import {EditorSimulationScenePanel} from "./simulation/EditorSimulationScenePanel";
import {EditorStructureOverviewPanel} from "./system/EditorStructureOverviewPanel";

export const EditorPanelComponents: Record<EditorPanelComponentTypes, {
    overviewPanel: React.ComponentType<any>;
    detailPanel?: React.ComponentType<any>;
    scenePanel: React.ComponentType<any>;
}> = {
    [EditorPanelTypes.Simulation]: {
        overviewPanel: EditorSimulationOverviewPanel,
        scenePanel: EditorSimulationScenePanel,
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
        overviewPanel: EditorStructureOverviewPanel,
        scenePanel: EditorEmptyPanel,
    },
}