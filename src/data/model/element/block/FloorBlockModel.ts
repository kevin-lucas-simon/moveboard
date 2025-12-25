import {BasicBlockDefault, BasicBlockModel} from "./BasicBlockModel";
import {ElementTypes} from "../ElementTypes";
import {ColorTypes} from "../../Color";

export type FloorBlockModel = BasicBlockModel
export const FloorBlockDefault: FloorBlockModel = {
    ...BasicBlockDefault,

    type: ElementTypes.FloorBlock,

    color: ColorTypes.Dark,
    position: {x: 0, y: -1, z: 0},
}