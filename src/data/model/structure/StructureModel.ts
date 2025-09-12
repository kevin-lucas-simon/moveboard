import {UUID} from "../UUID";
import {StructureTypes} from "./StructureTypes";

export type StructureID = UUID;
export type StructureModel = {
    id: StructureID,
    type: StructureTypes,
    name: string,
    parent: StructureID | null,
}

export const StructureDefault: StructureModel = {
    id: "000-000",
    type: StructureTypes.Unknown,
    name: "New Structure",
    parent: null,
}