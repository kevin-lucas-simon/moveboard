import React from "react";
import {BasicBlock, BasicBlockDefault} from "../experience/element/block/BasicBlock";
import {FloorBlock, FloorBlockDefault} from "../experience/element/block/FloorBlock";
import {GenericElement, GenericElementDefault} from "../experience/element/GenericElement";
import {BarrierBlock, BarrierBlockDefault} from "../experience/element/block/BarrierBlock";
import {BounceBlock, BounceBlockDefault} from "../experience/element/block/BounceBlock";
import {ElementModel, ElementType} from "../model/ElementModel";

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
    [ElementType.GenericElement]: {
        experienceComponent: GenericElement,
        defaultProps: GenericElementDefault,
    }
}

/**
 * Fallback element for unknown element types
 */
export const elementFallbackConfig = elementConfig[ElementType.GenericElement]