import {ElementDefault, ElementModel} from "../ElementModel";
import {ElementColorable, ElementColorableDefault} from "../marker/ElementColorable";
import {ElementTypes} from "../ElementTypes";
import {ColorTypes} from "../../Color";
import {ElementResizeable, ElementResizeableDefault} from "../marker/ElementResizeable";

export type SpinnerBlockModel = ElementModel
    & ElementResizeable
    & ElementColorable
    & {
        speed: number,
    }

export const SpinnerBlockDefault: SpinnerBlockModel = {
    ...ElementDefault,
    ...ElementResizeableDefault,
    ...ElementColorableDefault,

    type: ElementTypes.SpinnerBlock,

    color: ColorTypes.Primary,
    speed: 10,
}
