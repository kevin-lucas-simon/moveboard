import {StructureType} from "../StructureType";
import {StructureModel} from "./structure.models";
import {ChunkDefault, StructureDefault} from "./structure.defaults";

export const StructureConfig: Record<StructureType, {
    defaultProps: StructureModel;
}> = {
    [StructureType.Chunk]: {
        defaultProps: ChunkDefault,
    },
    [StructureType.Unknown]: {
        defaultProps: StructureDefault,
    }
}