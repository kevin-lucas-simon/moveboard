import {Vector3Like} from "three";
import {UUID} from "./util/UUID";

/**
 * API data model for generic elements
 */
export type ElementID = UUID;
export type ElementModel = {
    id: ElementID,
    type: string,
    position: Vector3Like,
}