import {Vector3Like} from "three";
import {NewJointModel} from "./NewJointModel";
import {NewElementModel} from "../element/NewElementModel";

/**
* API data model
*/
export type NewChunkModel = {
    name: string,
    player: Vector3Like,
    joints: NewJointModel[],
    elements: NewElementModel[],
}