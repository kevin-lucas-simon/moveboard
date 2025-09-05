import {BasicBlockDefault, BasicBlockModel} from "./BasicBlockModel";
import {ElementTypes} from "../../ElementTypes";

/**
 * Invisible block that acts as barrier for the player
 */
export type BarrierBlockModel = BasicBlockModel
export const BarrierBlockDefault: BarrierBlockModel = {
    ...BasicBlockDefault,
    type: ElementTypes.BarrierBlock,
}
