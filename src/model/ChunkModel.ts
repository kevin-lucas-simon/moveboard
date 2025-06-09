import {Vector3Like} from "three";
import {JointModel} from "./JointModel";
import {ElementModel} from "./ElementModel";
import {UUID} from "./util/uuid";

/**
* API data model
*/
export type ChunkID = UUID;
export type ChunkModel = {
    id: ChunkID,
    name: string,
    player: Vector3Like,
    joints: {[key: string]: JointModel},
    elements: {[key: string]: ElementModel},
}