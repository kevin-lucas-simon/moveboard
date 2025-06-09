import {Vector3Like} from "three";
import {ChunkID} from "./ChunkModel";

/**
 * API data model
 */
export type JointModel = {
    id: string,
    neighbour: ChunkID|null,
    position: Vector3Like,
    dimension: Vector3Like,
    vision: number,
}