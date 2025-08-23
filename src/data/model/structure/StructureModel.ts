import {UUID} from "../shared/UUID";
import {StructureType} from "./StructureType";
import {structureConfig} from "../../../config/structureConfig";

export type StructureID = UUID;
export type StructureModel = {
    id: StructureID,
    type: StructureType,
    name: string,
}

export const StructureDefault: StructureModel = {
    id: '000-000', // set by createStructure()
    type: StructureType.Unknown,
    name: "",
}

export function createStructure(type: StructureType): StructureModel {
    return {
        ...structureConfig[type]?.defaultProps || StructureDefault,
        id: '000-000', // set by createStructure()
        type: type,
    }
}
