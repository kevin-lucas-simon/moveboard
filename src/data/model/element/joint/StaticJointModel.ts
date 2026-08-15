import {ElementDefault, ElementModel} from "../ElementModel";
import {ElementTypes} from "../ElementTypes";
import {ChunkID} from "../../structure/spacial/ChunkModel";
import {ElementDimensionable, ElementDimensionableDefault} from "../marker/ElementDimensionable";

export type StaticJointModel = ElementModel
    & ElementDimensionable
    & {
    neighbour: ChunkID|null,
    vision: number,
}

export const StaticJointDefault: StaticJointModel = {
    ...ElementDefault,
    ...ElementDimensionableDefault,

    type: ElementTypes.StaticJoint,

    neighbour: null,
    vision: 1,
}
