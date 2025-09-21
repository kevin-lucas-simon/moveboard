import {StructureTypes} from "../../data/model/structure/StructureTypes";

export type EditorPanelComponentTypes = typeof EditorPanelTypes[keyof typeof EditorPanelTypes];

export const EditorPanelTypes = {
    ...StructureTypes,
    Simulation: 'Simulation',
} as const;
