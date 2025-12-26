import {ElementDefault, ElementModel} from "../ElementModel";
import {ElementColorable, ElementColorableDefault} from "../marker/ElementColorable";
import {ElementTypes} from "../ElementTypes";
import {ColorTypes} from "../../Color";
import {ElementDimensionable, ElementDimensionableDefault} from "../marker/ElementDimensionable";

export type SpinnerBlockModel = ElementModel
    & ElementDimensionable
    & ElementColorable
    & {
        speed: number,
    }

export const SpinnerBlockDefault: SpinnerBlockModel = {
    ...ElementDefault,
    ...ElementDimensionableDefault,
    ...ElementColorableDefault,

    type: ElementTypes.SpinnerBlock,

    color: ColorTypes.Primary,
    speed: 10,
}
