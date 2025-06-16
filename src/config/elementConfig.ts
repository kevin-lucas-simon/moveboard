import React from "react";
import {BasicBlock, BasicBlockDefault} from "../experience/element/block/BasicBlock";
import {FloorBlock, FloorBlockDefault} from "../experience/element/block/FloorBlock";
import {GenericElement, GenericElementDefault} from "../experience/element/GenericElement";
import {BarrierBlock, BarrierBlockDefault} from "../experience/element/block/BarrierBlock";
import {BounceBlock, BounceBlockDefault} from "../experience/element/block/BounceBlock";
import {ElementModel} from "../model/ElementModel";

/**
 * This file is used to store all blocks that are available in the editor.
 * This is used to serialize and deserialize the chunk elements.
 * Left: Name of block type in API JSON
 * Right: Corresponding implementations and properties
 */
export const elementConfig: Record<string, {
    experienceComponent: React.ComponentType<any>;
    defaultProps: ElementModel;
}> = {
    BarrierBlock: {
        experienceComponent: BarrierBlock,
        defaultProps: BarrierBlockDefault,
    },
    BasicBlock: {
        experienceComponent: BasicBlock,
        defaultProps: BasicBlockDefault,
    },
    BounceBlock: {
        experienceComponent: BounceBlock,
        defaultProps: BounceBlockDefault
    },
    FloorBlock: {
        experienceComponent: FloorBlock,
        defaultProps: FloorBlockDefault,
    },
}

/**
 * Fallback element for unknown element types
 */
export const elementFallbackConfig: {
    experienceComponent: React.ComponentType<any>;
    defaultProps: ElementModel;
} = {
    experienceComponent: GenericElement,
    defaultProps: GenericElementDefault,
}