import {ElementDefault, ElementModel} from "../ElementModel";
import {ElementTypes} from "../ElementTypes";
import {ColorTypes} from "../../Color";
import {ElementDimensionable, ElementDimensionableDefault} from "../marker/ElementDimensionable";
import {ElementColorable} from "../marker/ElementColorable";
import {ElementRotatable, ElementRotatableDefault} from "../marker/ElementRotatable";

export type BasicBlockModel = ElementModel
    & ElementDimensionable
    & ElementRotatable
    & ElementColorable

export const BasicBlockDefault: BasicBlockModel = {
    ...ElementDefault,
    ...ElementRotatableDefault,
    ...ElementDimensionableDefault,

    type: ElementTypes.BasicBlock,

    color: ColorTypes.Light,
}