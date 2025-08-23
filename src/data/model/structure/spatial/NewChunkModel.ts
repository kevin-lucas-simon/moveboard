import {StructureDefault, StructureModel} from "../StructureModel";
import {Vector3Like} from "three";
import {ElementID, ElementModel} from "../../element/ElementModel";
import {StructureType} from "../StructureType";

export type NewChunkModel = StructureModel & {
    player: Vector3Like,
    elements: {[key: ElementID]: ElementModel},
}

export const NewChunkDefault: NewChunkModel = {
    ...StructureDefault,
    type: StructureType.Chunk,
    player: { x: 0, y: 0, z: 0 },
    elements: {},
}