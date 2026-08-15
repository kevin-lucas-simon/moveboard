import {ElementDefault} from "../ElementModel";
import {ElementTypes} from "../ElementTypes";
import {ElementDimensionable, ElementDimensionableDefault} from "../marker/ElementDimensionable";
import {ElementJoint, ElementJointDefault} from "../marker/ElementJoint";

export type StaticJointModel = ElementJoint
    & ElementDimensionable
    & {}

export const StaticJointDefault: StaticJointModel = {
    ...ElementDefault,
    ...ElementDimensionableDefault,
    ...ElementJointDefault,

    type: ElementTypes.StaticJoint,
}
