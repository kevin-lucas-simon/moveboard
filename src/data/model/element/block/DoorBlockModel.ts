import {ElementDefault, ElementModel} from "../ElementModel";
import {ElementRotatable, ElementRotatableDefault} from "../marker/ElementRotatable";
import {ElementDimensionable, ElementDimensionableDefault} from "../marker/ElementDimensionable";
import {ElementTypes} from "../ElementTypes";

export type DoorBlockModel = ElementModel
    & ElementDimensionable
    & ElementRotatable

export const DoorBlockDefault: DoorBlockModel = {
    ...ElementDefault,
    ...ElementDimensionableDefault,
    ...ElementRotatableDefault,

    type: ElementTypes.DoorBlock,
}