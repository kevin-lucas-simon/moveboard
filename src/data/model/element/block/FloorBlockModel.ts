import {BasicBlockDefault, BasicBlockModel} from "./BasicBlockModel";
import {ElementType} from "../../ElementType";

/**
 * Block that is guarantied visible in camera chunk view.
 */
export type FloorBlockModel = BasicBlockModel
export const FloorBlockDefault: FloorBlockModel = {
    ...BasicBlockDefault,
    type: ElementType.FloorBlock,
    color: "red",
    position: {x: 0, y: -1, z: 0},
}