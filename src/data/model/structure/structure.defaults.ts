import {StructureTypes} from "../structure.types";
import {ChunkModel, StructureModel} from "./structure.models";

export const StructureDefault: StructureModel = {
    id: "000-000",
    type: StructureTypes.Unknown,
    name: "New Structure",
}

export const ChunkDefault: ChunkModel = {
    ...StructureDefault,
    type: StructureTypes.Chunk,
    name: "New Chunk",
    player: { x: 0, y: 0, z: 0 },
    elements: {},
}