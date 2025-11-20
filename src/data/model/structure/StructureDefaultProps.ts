import {StructureTypes} from "./StructureTypes";
import {ChunkDefault} from "./spacial/ChunkModel";
import {StructureDefault, StructureModel} from "./StructureModel";
import {SectionDefault} from "./system/SectionModel";
import {ColoringDefault} from "./material/ColoringModel";

export const StructureDefaultProps: Record<StructureTypes, {
    defaultProps: StructureModel;
}> = {
    [StructureTypes.Chunk]: {
        defaultProps: ChunkDefault,
    },
    [StructureTypes.Coloring]: {
        defaultProps: ColoringDefault,
    },
    [StructureTypes.Section]: {
        defaultProps: SectionDefault,
    },
    [StructureTypes.Unknown]: {
        defaultProps: StructureDefault,
    }
}