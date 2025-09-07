import {StructureTypes} from "./StructureTypes";
import {ChunkDefault} from "./spacial/ChunkModel";
import {StructureDefault, StructureModel} from "./StructureModel";
import {SectionDefault} from "./system/SectionModel";

export const StructureDefaultProps: Record<StructureTypes, {
    defaultProps: StructureModel;
}> = {
    [StructureTypes.Chunk]: {
        defaultProps: ChunkDefault,
    },
    [StructureTypes.Section]: {
        defaultProps: SectionDefault,
    },
    [StructureTypes.Unknown]: {
        defaultProps: StructureDefault,
    }
}