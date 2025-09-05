import {StructureTypes} from "../model/structure/StructureTypes";
import {createUUID} from "../model/shared/UUID";
import {StructureDefaultProps} from "../model/structure/StructureDefaultProps";
import {StructureDefault, StructureID, StructureModel} from "../model/structure/StructureModel";

export function createStructure<T extends StructureModel>(type: StructureTypes): T {
    return {
        ...StructureDefaultProps[type]?.defaultProps || StructureDefault,
        id: createUUID(),
        type: type,
    } as T;
}

export function filterStructures<T extends StructureModel>(
    structures: { [key: StructureID]: StructureModel },
    type: StructureTypes
) {
    return Object.fromEntries(
        Object.entries(structures).filter(([_, structure]) => structure.type === type)
    ) as { [key: StructureID]: T };
}