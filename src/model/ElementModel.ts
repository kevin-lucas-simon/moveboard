import {Vector3Like} from "three";
import {UUID} from "./util/UUID";

/**
 * API data model for generic elements
 */
export type ElementID = UUID;
export type ElementModel = {
    id: ElementID,
    type: ElementType,
    position: Vector3Like,
}

export enum ElementType {
    GenericElement = "GenericElement",
    BarrierBlock = "BarrierBlock",
    BasicBlock = "BasicBlock",
    BounceBlock = "BounceBlock",
    FloorBlock = "FloorBlock",
}