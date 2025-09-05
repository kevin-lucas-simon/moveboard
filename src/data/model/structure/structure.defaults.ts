import {StructureType} from "../StructureType";
import {ChunkModel, StructureModel} from "./structure.models";

export const StructureDefault: StructureModel = {
    id: "000-000",
    type: StructureType.Unknown,
    name: "New Structure",
}

export const ChunkDefault: ChunkModel = {
    ...StructureDefault,
    type: StructureType.Chunk,
    name: "New Chunk",
    player: { x: 0, y: 0, z: 0 },
    elements: {},
}