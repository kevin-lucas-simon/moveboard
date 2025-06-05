import {Vector3Like} from "three";

/**
 * API data model for generic elements
 */
export type ElementModel = {
    id: string,
    type: string,
    position: Vector3Like,
}