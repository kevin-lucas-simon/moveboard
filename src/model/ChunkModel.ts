import {Vector3Like} from "three";
import {JointModel} from "./JointModel";
import {ElementModel} from "./ElementModel";

/**
* API data model
*/
export type ChunkModel = {
    id: string,
    name: string,
    player: Vector3Like,
    joints: {[key: string]: JointModel},
    elements: {[key: string]: ElementModel},
}