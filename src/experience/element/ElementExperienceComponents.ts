import {ElementTypes} from "../../data/model/element/ElementTypes";
import React from "react";
import {BarrierBlock} from "./block/BarrierBlock";
import {BasicBlock} from "./block/BasicBlock";
import {BounceBlock} from "./block/BounceBlock";
import {FloorBlock} from "./block/FloorBlock";
import {EmptyElement} from "./system/EmptyElement";
import {JointElement} from "./joint/JointElement";
import {UnknownElement} from "./system/UnknownElement";

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
    [ElementTypes.FloorBlock]: {
        experienceComponent: FloorBlock,
    },
    [ElementTypes.Group]: {
        experienceComponent: EmptyElement,
    },
    [ElementTypes.Joint]: {
        experienceComponent: JointElement,
    },
    [ElementTypes.Unknown]: {
        experienceComponent: UnknownElement,
    }
}