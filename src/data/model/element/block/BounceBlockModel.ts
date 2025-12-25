import {ElementDefault, ElementModel} from "../ElementModel";
import {ElementTypes} from "../ElementTypes";
import {ElementColorable} from "../marker/ElementColorable";
import {ColorTypes} from "../../Color";

export type BounceBlockModel = ElementModel
    & ElementColorable
    & {
    diameter: number,
    intensity: number,
}
export const BounceBlockDefault: BounceBlockModel = {
    ...ElementDefault,

    type: ElementTypes.BounceBlock,

    color: ColorTypes.Primary,
    diameter: 1,
    intensity: 1,
}