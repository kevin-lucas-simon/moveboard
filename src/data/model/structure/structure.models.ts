import {UUID} from "../shared/UUID";
import {Vector3Like} from "three";
import {ElementModel, ElementID} from "../element/ElementModel";

export type StructureID = UUID;
export type StructureModel = {
    id: StructureID,
    type: string,
    name: string,
}

export type ChunkID = StructureID;
export type ChunkModel = StructureModel & {
    id: ChunkID,
    player: Vector3Like,
    elements: {[key: ElementID]: ElementModel},
}