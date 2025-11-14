import {StructureDefault, StructureModel} from "../StructureModel";
import {StructureTypes} from "../StructureTypes";

/**
 * SectionModel represents a group of structures within a level.
 * It is used to organize structures hierarchically and manage their visibility.
 */
export type SectionModel = StructureModel & {
    collapsed: boolean;
}

export const SectionDefault: SectionModel = {
    ...StructureDefault,
    type: StructureTypes.Section,
    name: "New Group",
    collapsed: false,
}