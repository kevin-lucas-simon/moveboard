import React from "react";
import {BasicBlock} from "../experience/element/block/BasicBlock";
import {FloorBlock} from "../experience/element/block/FloorBlock";
import {UnknownElement} from "../experience/element/UnknownElement";
import {BarrierBlock} from "../experience/element/block/BarrierBlock";
import {BounceBlock} from "../experience/element/block/BounceBlock";
import {ElementDefault, ElementModel} from "../data/model/element/ElementModel";
import {BarrierBlockDefault} from "../data/model/element/block/BarrierBlockModel";
import {BasicBlockDefault} from "../data/model/element/block/BasicBlockModel";
import {BounceBlockDefault} from "../data/model/element/block/BounceBlockModel";
import {FloorBlockDefault} from "../data/model/element/block/FloorBlockModel";
import {GroupDefault} from "../data/model/element/organise/GroupModel";
import {EmptyElement} from "../experience/element/EmptyElement";
import {JointDefault} from "../data/model/element/joint/JointModel";
import {JointElement} from "../experience/element/joint/JointElement";
import {ElementType} from "../data/model/ElementType";

/**
 * This file is used to store all blocks that are available in the editor.
 * This is used to serialize and deserialize the chunk elements.
 * Left: Name of block type in API JSON
 * Right: Corresponding implementations and properties
 */
export const elementConfig: Record<ElementType, {
    experienceComponent: React.ComponentType<any>;
    defaultProps: ElementModel;
}> = {
    [ElementType.BarrierBlock]: {
        experienceComponent: BarrierBlock,
        defaultProps: BarrierBlockDefault,
    },
    [ElementType.BasicBlock]: {
        experienceComponent: BasicBlock,
        defaultProps: BasicBlockDefault,
    },
    [ElementType.BounceBlock]: {
        experienceComponent: BounceBlock,
        defaultProps: BounceBlockDefault
    },
    [ElementType.FloorBlock]: {
        experienceComponent: FloorBlock,
        defaultProps: FloorBlockDefault,
    },
    [ElementType.Group]: {
        experienceComponent: EmptyElement,
        defaultProps: GroupDefault,
    },
    [ElementType.Joint]: {
        experienceComponent: JointElement,
        defaultProps: JointDefault,
    },
    [ElementType.Unknown]: {
        experienceComponent: UnknownElement,
        defaultProps: ElementDefault,
    },
}