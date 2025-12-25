import {ElementDefault, ElementModel} from "../ElementModel";
import {ElementTypes} from "../ElementTypes";
import {ColorTypes} from "../../Color";
import {ElementResizeable, ElementResizeableDefault} from "../marker/ElementResizeable";
import {ElementColorable} from "../marker/ElementColorable";

export type BasicBlockModel = ElementModel
    & ElementResizeable
    & ElementColorable

export const BasicBlockDefault: BasicBlockModel = {
    ...ElementDefault,
    ...ElementResizeableDefault,

    type: ElementTypes.BasicBlock,

    color: ColorTypes.Light,
}