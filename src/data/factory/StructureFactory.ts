import {StructureID, StructureModel} from "../model/structure/structure.models";
import {StructureType} from "../model/StructureType";
import {StructureConfig} from "../model/structure/structure.config";
import {StructureDefault} from "../model/structure/structure.defaults";
import {createUUID} from "../model/shared/UUID";

export function createStructure<T extends StructureModel>(type: StructureType): T {
    return {
        ...StructureConfig[type]?.defaultProps || StructureDefault,
        id: createUUID(),
        type: type,
    } as T;
}

export function filterStructures<T extends StructureModel>(
    structures: { [key: StructureID]: StructureModel },
    type: StructureType
) {
    return Object.fromEntries(
        Object.entries(structures).filter(([_, structure]) => structure.type === type)
    ) as { [key: StructureID]: T };
}