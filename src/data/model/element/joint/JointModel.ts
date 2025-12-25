import {ElementDefault, ElementModel} from "../ElementModel";
import {ElementTypes} from "../ElementTypes";
import {ChunkID} from "../../structure/spacial/ChunkModel";
import {ElementResizeable, ElementResizeableDefault} from "../marker/ElementResizeable";

export type JointModel = ElementModel
    & ElementResizeable
    & {
    neighbour: ChunkID|null,
    vision: number,
}

export const JointDefault: JointModel = {
    ...ElementDefault,
    ...ElementResizeableDefault,

    type: ElementTypes.Joint,

    neighbour: null,
    vision: 1,
}
