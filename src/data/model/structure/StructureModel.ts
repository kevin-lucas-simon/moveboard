import {UUID} from "../shared/UUID";
import {StructureTypes} from "./StructureTypes";

export type StructureID = UUID;
export type StructureModel = {
    id: StructureID,
    type: string,
    name: string,
}

export const StructureDefault: StructureModel = {
    id: "000-000",
    type: StructureTypes.Unknown,
    name: "New Structure",
}