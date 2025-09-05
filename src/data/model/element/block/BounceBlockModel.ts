import {ElementDefault, ElementModel} from "../ElementModel";
import {ElementTypes} from "../../ElementTypes";

/**
 * Bouncer block that bounces the player on collision
 */
export type BounceBlockModel = ElementModel & {
    diameter: number,
    intensity: number,
}
export const BounceBlockDefault: BounceBlockModel = {
    ...ElementDefault,
    type: ElementTypes.BounceBlock,
    diameter: 1,
    intensity: 1,
}