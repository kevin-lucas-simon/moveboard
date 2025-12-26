import {ElementDefault, ElementModel} from "../ElementModel";
import {ElementTypes} from "../ElementTypes";
import {ChunkID} from "../../structure/spacial/ChunkModel";
import {ElementDimensionable, ElementDimensionableDefault} from "../marker/ElementDimensionable";

export type JointModel = ElementModel
    & ElementDimensionable
    & {
    neighbour: ChunkID|null,
    vision: number,
}

export const JointDefault: JointModel = {
    ...ElementDefault,
    ...ElementDimensionableDefault,

    type: ElementTypes.Joint,

    neighbour: null,
    vision: 1,
}
