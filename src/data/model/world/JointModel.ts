import {Vector3Like} from "three";
import {ChunkID} from "./ChunkModel";
import {createUUID, UUID} from "../shared/UUID";

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

export function createJoint(): JointModel {
    return {
        id: createUUID(),
        neighbour: null,
        position: { x: 0, y: 0, z: 0 },
        dimension: { x: 1, y: 1, z: 1 },
        vision: 1,
    };
}
