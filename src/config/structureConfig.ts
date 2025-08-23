import {StructureType} from "../data/model/structure/StructureType";
import {StructureDefault, StructureModel} from "../data/model/structure/StructureModel";
import {NewChunkDefault} from "../data/model/structure/spatial/NewChunkModel";

export const structureConfig: Record<StructureType, {
    defaultProps: StructureModel;
}> = {
    [StructureType.Chunk]: {
        defaultProps: NewChunkDefault,
    },
    [StructureType.Unknown]: {
        defaultProps: StructureDefault,
    },
}