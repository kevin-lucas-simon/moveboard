import {Vector3Like} from "three";
import {JointModel} from "./JointModel";
import {ElementModel} from "./ElementModel";

/**
* API data model
*/
export type ChunkModel = {
    name: string,
    player: Vector3Like,
    joints: JointModel[],
    elements: ElementModel[],
}