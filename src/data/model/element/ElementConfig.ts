import React from "react";
import {BasicBlock} from "../../../experience/element/block/BasicBlock";
import {FloorBlock} from "../../../experience/element/block/FloorBlock";
import {UnknownElement} from "../../../experience/element/UnknownElement";
import {BarrierBlock} from "../../../experience/element/block/BarrierBlock";
import {BounceBlock} from "../../../experience/element/block/BounceBlock";
import {ElementDefault, ElementModel} from "./ElementModel";
import {BarrierBlockDefault} from "./block/BarrierBlockModel";
import {BasicBlockDefault} from "./block/BasicBlockModel";
import {BounceBlockDefault} from "./block/BounceBlockModel";
import {FloorBlockDefault} from "./block/FloorBlockModel";
import {GroupDefault} from "./system/GroupModel";
import {EmptyElement} from "../../../experience/element/EmptyElement";
import {JointDefault} from "./joint/JointModel";
import {JointElement} from "../../../experience/element/joint/JointElement";
import {ElementTypes} from "./ElementTypes";

/**
 * This file is used to store all blocks that are available in the editor.
 * This is used to serialize and deserialize the chunk elements.
 * Left: Name of block type in API JSON
 * Right: Corresponding implementations and properties
 */
export const ElementConfig: Record<ElementTypes, {
    experienceComponent: React.ComponentType<any>;
    defaultProps: ElementModel;
}> = {
    [ElementTypes.BarrierBlock]: {
        experienceComponent: BarrierBlock,
        defaultProps: BarrierBlockDefault,
    },
    [ElementTypes.BasicBlock]: {
        experienceComponent: BasicBlock,
        defaultProps: BasicBlockDefault,
    },
    [ElementTypes.BounceBlock]: {
        experienceComponent: BounceBlock,
        defaultProps: BounceBlockDefault
    },
    [ElementTypes.FloorBlock]: {
        experienceComponent: FloorBlock,
        defaultProps: FloorBlockDefault,
    },
    [ElementTypes.Group]: {
        experienceComponent: EmptyElement,
        defaultProps: GroupDefault,
    },
    [ElementTypes.Joint]: {
        experienceComponent: JointElement,
        defaultProps: JointDefault,
    },
    [ElementTypes.Unknown]: {
        experienceComponent: UnknownElement,
        defaultProps: ElementDefault,
    },
}