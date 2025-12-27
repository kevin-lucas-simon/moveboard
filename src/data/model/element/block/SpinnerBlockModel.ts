import {ElementDefault, ElementModel} from "../ElementModel";
import {ElementColorable, ElementColorableDefault} from "../marker/ElementColorable";
import {ElementTypes} from "../ElementTypes";
import {ColorTypes} from "../../Color";
import {ElementDimensionable, ElementDimensionableDefault} from "../marker/ElementDimensionable";
import {ElementRotatable, ElementRotatableDefault} from "../marker/ElementRotatable";

export type SpinnerBlockModel = ElementModel
    & ElementDimensionable
    & ElementRotatable
    & ElementColorable
    & {
        speed: number,
    }

export const SpinnerBlockDefault: SpinnerBlockModel = {
    ...ElementDefault,
    ...ElementDimensionableDefault,
    ...ElementRotatableDefault,
    ...ElementColorableDefault,

    type: ElementTypes.SpinnerBlock,

    dimension: {x: 3, y: 1, z: 1},
    color: ColorTypes.Primary,
    speed: 10,
}
