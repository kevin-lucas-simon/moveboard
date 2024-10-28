import {Vector3Like} from "three";

export type JointModel = {
    neighbour: string,
    position: Vector3Like,
    dimension: Vector3Like,
}