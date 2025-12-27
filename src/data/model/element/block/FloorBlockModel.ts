import {ElementTypes} from "../ElementTypes";
import {ColorTypes} from "../../Color";
import {ElementDefault, ElementModel} from "../ElementModel";
import {ElementDimensionable, ElementDimensionableDefault} from "../marker/ElementDimensionable";
import {ElementColorable, ElementColorableDefault} from "../marker/ElementColorable";

export type FloorBlockModel = ElementModel
    & ElementDimensionable
    & ElementColorable

export const FloorBlockDefault: FloorBlockModel = {
    ...ElementDefault,
    ...ElementDimensionableDefault,
    ...ElementColorableDefault,

    type: ElementTypes.FloorBlock,

    color: ColorTypes.Dark,
    position: {x: 0, y: -1, z: 0},
}