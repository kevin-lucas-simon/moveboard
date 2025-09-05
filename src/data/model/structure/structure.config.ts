import {StructureTypes} from "../StructureTypes";
import {StructureModel} from "./structure.models";
import {ChunkDefault, StructureDefault} from "./structure.defaults";

export const StructureConfig: Record<StructureTypes, {
    defaultProps: StructureModel;
}> = {
    [StructureTypes.Chunk]: {
        defaultProps: ChunkDefault,
    },
    [StructureTypes.Unknown]: {
        defaultProps: StructureDefault,
    }
}