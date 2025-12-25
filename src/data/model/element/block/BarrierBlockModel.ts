import {ElementTypes} from "../ElementTypes";
import {ElementDefault, ElementModel} from "../ElementModel";
import {ElementResizeable, ElementResizeableDefault} from "../marker/ElementResizeable";

export type BarrierBlockModel = ElementModel
    & ElementResizeable

export const BarrierBlockDefault: BarrierBlockModel = {
    ...ElementDefault,
    ...ElementResizeableDefault,

    type: ElementTypes.BarrierBlock,
}
