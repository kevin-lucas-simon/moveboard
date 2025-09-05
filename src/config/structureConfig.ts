import {StructureDefault, StructureModel} from "../data/model/structure/StructureModel";
import {StructureType} from "../data/model/structure/StructureType";
import {ChunkDefault} from "../data/model/structure/spatial/ChunkModel";

export const structureConfig: Record<StructureType, {
    defaultProps: StructureModel;
}> = {
    [StructureType.Chunk]: {
        defaultProps: ChunkDefault,
    },
    [StructureType.Unknown]: {
        defaultProps: StructureDefault,
    },
}