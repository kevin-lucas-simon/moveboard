import {ElementDefault} from "../ElementModel";
import {ElementTypes} from "../ElementTypes";
import {ElementJoint, ElementJointDefault} from "../marker/ElementJoint";

export type RandomJointModel = ElementJoint & {}

export const RandomJointDefault: RandomJointModel = {
    ...ElementDefault,
    ...ElementJointDefault,

    type: ElementTypes.RandomJoint,
}
