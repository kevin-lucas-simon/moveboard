import {BasicBlockDefault, BasicBlockModel} from "./BasicBlockModel";
import {ElementTypes} from "../ElementTypes";

/**
 * Block that is guarantied visible in camera chunk view.
 */
export type FloorBlockModel = BasicBlockModel
export const FloorBlockDefault: FloorBlockModel = {
    ...BasicBlockDefault,
    type: ElementTypes.FloorBlock,
    color: "red",
    position: {x: 0, y: -1, z: 0},
}