import {Vector3Like} from "three";

/**
 * API data model
 */
export type JointModel = {
    neighbour: string,
    position: Vector3Like,
    dimension: Vector3Like,
    vision: number,
}