import {ElementDefault, ElementModel} from "../ElementModel";
import {ElementDimensionable, ElementDimensionableDefault} from "../marker/ElementDimensionable";
import {ElementTypes} from "../ElementTypes";
import {ElementRotatable, ElementRotatableDefault} from "../marker/ElementRotatable";

export type ButtonBlockModel = ElementModel
    & ElementDimensionable
    & ElementRotatable

export const ButtonBlockDefault: ButtonBlockModel = {
    ...ElementDefault,
    ...ElementDimensionableDefault,
    ...ElementRotatableDefault,

    type: ElementTypes.ButtonBlock,
}