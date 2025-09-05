import {Vector3Like} from "three";
import {ElementID, ElementModel} from "../../element/ElementModel";
import {StructureTypes} from "../StructureTypes";
import {StructureDefault, StructureID, StructureModel} from "../StructureModel";

export type ChunkID = StructureID;
export type ChunkModel = StructureModel & {
    id: ChunkID,
    player: Vector3Like,
    elements: { [key: ElementID]: ElementModel },
}

export const ChunkDefault: ChunkModel = {
    ...StructureDefault,
    type: StructureTypes.Chunk,
    name: "New Chunk",
    player: {x: 0, y: 0, z: 0},
    elements: {},
}