import {ElementDefault, ElementModel} from "../ElementModel";
import {Vector3Like} from "three";
import {ElementType} from "../ElementType";

/**
 * Basic block with fixed position
 */
export type BasicBlockModel = ElementModel & {
    dimension: Vector3Like,
    color: string,
}

export const BasicBlockDefault: BasicBlockModel = {
    ...ElementDefault,
    type: ElementType.BasicBlock,
    dimension: {x: 1, y: 1, z: 1},
    color: "grey",
}