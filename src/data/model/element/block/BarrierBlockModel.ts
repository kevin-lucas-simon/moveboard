import {ElementTypes} from "../ElementTypes";
import {ElementDefault, ElementModel} from "../ElementModel";
import {ElementDimensionable, ElementDimensionableDefault} from "../marker/ElementDimensionable";

export type BarrierBlockModel = ElementModel
    & ElementDimensionable

export const BarrierBlockDefault: BarrierBlockModel = {
    ...ElementDefault,
    ...ElementDimensionableDefault,

    type: ElementTypes.BarrierBlock,
}
