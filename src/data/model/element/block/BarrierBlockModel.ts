import {BasicBlockDefault, BasicBlockModel} from "./BasicBlockModel";
import {ElementTypes} from "../ElementTypes";

export type BarrierBlockModel = BasicBlockModel
export const BarrierBlockDefault: BarrierBlockModel = {
    ...BasicBlockDefault,

    type: ElementTypes.BarrierBlock,
}
