import {Vector3Like} from "three";

/**
 * API data model
 */
export type NewElementModel = {
    type: string,
    position: Vector3Like,
}

export type NewBasicBlockModel = NewElementModel & {
    dimension: Vector3Like,
    color?: string,
}

export type NewFloorBlockModel = NewBasicBlockModel