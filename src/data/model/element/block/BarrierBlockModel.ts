import {BasicBlockDefault, BasicBlockModel} from "./BasicBlockModel";
import {ElementType} from "../ElementType";

/**
 * Invisible block that acts as barrier for the player
 */
export type BarrierBlockModel = BasicBlockModel
export const BarrierBlockDefault: BarrierBlockModel = {
    ...BasicBlockDefault,
    type: ElementType.BarrierBlock,
}
