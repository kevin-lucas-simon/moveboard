import {Vector3Like} from "three";

/**
 * API data model for generic element
 * All element implementations are descendants from this interface
 */
export type ElementModel = {
    type: string,
    position: Vector3Like,
}
