import React from "react";
import {BasicBlock, BasicBlockDefault} from "../element/block/BasicBlock";
import {FloorBlock, FloorBlockDefault} from "../element/block/FloorBlock";
import {GenericElement, GenericElementDefault} from "../element/GenericElement";
import {BarrierBlock, BarrierBlockDefault} from "../element/block/BarrierBlock";
import {BounceBlock, BounceBlockDefault} from "../element/block/BounceBlock";

export type ElementDefinition = {
    experienceComponent: React.ComponentType<any>,
    defaultProps: any,
}

/**
 * This file is used to store all blocks that are available in the editor.
 * This is used to serialize and deserialize the chunk elements.
 * Left: Name of block type in API JSON
 * Right: Corresponding implementations and properties
 */
export const elementDefinition: { [key: string]: ElementDefinition } = {
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
export const elementFallback: ElementDefinition = {
    experienceComponent: GenericElement,
    defaultProps: GenericElementDefault,
}