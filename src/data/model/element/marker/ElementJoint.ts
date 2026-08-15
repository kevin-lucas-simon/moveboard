import {ElementModel} from "../ElementModel";
import {ElementTypes} from "../ElementTypes";
import {ChunkID} from "../../structure/spacial/ChunkModel";

export type ElementJoint = ElementModel & {
    neighbour: ChunkID|null,
    vision: number,
}

export const ElementJointDefault = {
    neighbour: null,
    vision: 1,
} as const;

export const JOINT_ELEMENT_TYPES: ElementTypes[] = [ElementTypes.StaticJoint, ElementTypes.RandomJoint];

export function isElementJoint(element: ElementModel): element is ElementJoint {
    return JOINT_ELEMENT_TYPES.includes(element.type);
}
