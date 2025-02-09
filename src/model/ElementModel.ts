import {Vector3Like} from "three";

/**
 * API data model for generic elements
 */
export type ElementModel = {
    type: string,
    position: Vector3Like,
}