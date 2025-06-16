import {Vector3Like} from "three";
import {ChunkID} from "./ChunkModel";
import {UUID} from "../shared/UUID";

/**
 * API data model
 */
export type JointID = UUID;
export type JointModel = {
    id: JointID,
    neighbour: ChunkID|null,
    position: Vector3Like,
    dimension: Vector3Like,
    vision: number,
}