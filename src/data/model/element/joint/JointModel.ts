import {Vector3Like} from "three";
import {ElementDefault, ElementID, ElementModel} from "../ElementModel";
import {ChunkID} from "../../structure/structure.models";
import {ElementTypes} from "../../ElementTypes";

/**
 * API data model
 */
export type JointModel = ElementModel & {
    id: ElementID,
    neighbour: ChunkID|null,
    dimension: Vector3Like,
    vision: number,
}

export const JointDefault: JointModel = {
    ...ElementDefault,
    type: ElementTypes.Joint,
    neighbour: null,
    dimension: { x: 1, y: 1, z: 1 },
    vision: 1,
}
