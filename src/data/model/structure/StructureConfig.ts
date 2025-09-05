import {StructureTypes} from "./StructureTypes";
import {ChunkDefault} from "./spacial/ChunkModel";
import {StructureDefault, StructureModel} from "./StructureModel";

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