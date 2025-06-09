import {Vector3Like} from "three";
import {JointID, JointModel} from "./JointModel";
import {ElementID, ElementModel} from "./ElementModel";
import {UUID} from "./util/UUID";

/**
* API data model
*/
export type ChunkID = UUID;
export type ChunkModel = {
    id: ChunkID,
    name: string,
    player: Vector3Like,
    joints: {[key: JointID]: JointModel},
    elements: {[key: ElementID]: ElementModel},
}