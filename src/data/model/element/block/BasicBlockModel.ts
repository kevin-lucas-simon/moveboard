import {ElementDefault, ElementModel} from "../ElementModel";
import {ElementTypes} from "../ElementTypes";
import {ColorType, ColorTypes} from "../../Color";
import {ElementResizeable, ElementResizeableDefault} from "../marker/ElementResizeable";

export type BasicBlockModel = ElementModel
    & ElementResizeable
    & {
    color: ColorType,
}

export const BasicBlockDefault: BasicBlockModel = {
    ...ElementDefault,
    ...ElementResizeableDefault,

    type: ElementTypes.BasicBlock,

    color: ColorTypes.Light,
}