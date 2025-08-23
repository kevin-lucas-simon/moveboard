import {StructureType} from "../data/model/structure/StructureType";
import {StructureDefault, StructureModel} from "../data/model/structure/StructureModel";

export const structureConfig: Record<StructureType, {
    defaultProps: StructureModel;
}> = {
    [StructureType.Unknown]: {
        defaultProps: StructureDefault,
    },
}