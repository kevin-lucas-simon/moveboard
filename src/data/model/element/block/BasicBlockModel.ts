import {ElementDefault, ElementModel} from "../ElementModel";
import {ElementTypes} from "../ElementTypes";
import {ColorType, ColorTypes} from "../../Color";
import {ElementResizeable, ElementResizeableDefault} from "../marker/ElementIsResizeable";

/**
 * Basic block with fixed position
 */
export type BasicBlockModel = ElementModel
    & ElementResizeable
    & {
    color: ColorType,
}

export const BasicBlockDefault: BasicBlockModel = {
    ...ElementDefault,
    ...ElementResizeableDefault,

    type: ElementTypes.BasicBlock,
    dimension: {x: 1, y: 1, z: 1},
    color: ColorTypes.Light,
}