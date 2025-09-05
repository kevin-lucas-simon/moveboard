import {createUUID, UUID} from "../shared/UUID";
import {StructureType} from "./StructureType";
import {structureConfig} from "../../../config/structureConfig";

export type StructureID = UUID;
export type StructureModel = {
    id: StructureID,
    type: StructureType,
    name: string,
}

export var StructureDefault: StructureModel = {
    id: '000-000', // set by createStructure()
    type: StructureType.Unknown,
    name: "",
}

export function createStructure<T extends StructureModel>(type: StructureType): T {
    const structure = {
        ...structureConfig[type]?.defaultProps || StructureDefault,
        id: createUUID(),
        type: type,
    }
    return structure as T;
}
