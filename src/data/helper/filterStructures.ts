import {StructureType} from "../model/structure/StructureType";
import {StructureID, StructureModel} from "../model/structure/StructureModel";

export function filterStructures<T extends StructureModel>(
    structures: {[key: StructureID]: StructureModel},
    type: StructureType
) {
    return Object.fromEntries(
        Object.entries(structures).filter(([_, structure]) => structure.type === type)
    ) as {[key: StructureID]: T};
}