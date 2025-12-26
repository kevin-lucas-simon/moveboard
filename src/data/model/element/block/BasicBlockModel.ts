import {ElementDefault, ElementModel} from "../ElementModel";
import {ElementTypes} from "../ElementTypes";
import {ColorTypes} from "../../Color";
import {ElementDimensionable, ElementDimensionableDefault} from "../marker/ElementDimensionable";
import {ElementColorable} from "../marker/ElementColorable";

export type BasicBlockModel = ElementModel
    & ElementDimensionable
    & ElementColorable

export const BasicBlockDefault: BasicBlockModel = {
    ...ElementDefault,
    ...ElementDimensionableDefault,

    type: ElementTypes.BasicBlock,

    color: ColorTypes.Light,
}