import {ElementDefault, ElementModel} from "../ElementModel";
import {ElementType} from "../ElementType";

/**
 * Bouncer block that bounces the player on collision
 */
export type BounceBlockModel = ElementModel & {
    diameter: number,
    intensity: number,
}
export const BounceBlockDefault: BounceBlockModel = {
    ...ElementDefault,
    type: ElementType.BounceBlock,
    diameter: 1,
    intensity: 1,
}