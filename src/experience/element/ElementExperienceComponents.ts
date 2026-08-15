import {ElementTypes} from "../../data/model/element/ElementTypes";
import React from "react";
import {BarrierBlock} from "./block/BarrierBlock";
import {BasicBlock} from "./block/BasicBlock";
import {BounceBlock} from "./block/BounceBlock";
import {FloorBlock} from "./block/FloorBlock";
import {EmptyElement} from "./system/EmptyElement";
import {StaticJointElement} from "./joint/StaticJointElement";
import {UnknownElement} from "./system/UnknownElement";
import {SpinnerBlock} from "./block/SpinnerBlock";
import {ButtonBlock} from "./block/ButtonBlock";
import {DoorBlock} from "./block/DoorBlock";

export const ElementExperienceComponents: Record<ElementTypes, {
    experienceComponent: React.ComponentType<any>;
}> = {
    [ElementTypes.BarrierBlock]: {
        experienceComponent: BarrierBlock,
    },
    [ElementTypes.BasicBlock]: {
        experienceComponent: BasicBlock,
    },
    [ElementTypes.BounceBlock]: {
        experienceComponent: BounceBlock,
    },
    [ElementTypes.ButtonBlock]: {
        experienceComponent: ButtonBlock,
    },
    [ElementTypes.DoorBlock]: {
        experienceComponent: DoorBlock,
    },
    [ElementTypes.FloorBlock]: {
        experienceComponent: FloorBlock,
    },
    [ElementTypes.Group]: {
        experienceComponent: EmptyElement,
    },
    [ElementTypes.SpinnerBlock]: {
        experienceComponent: SpinnerBlock,
    },
    [ElementTypes.StaticJoint]: {
        experienceComponent: StaticJointElement,
    },
    [ElementTypes.Unknown]: {
        experienceComponent: UnknownElement,
    }
}