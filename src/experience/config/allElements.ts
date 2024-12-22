import React from "react";
import {BasicBlock} from "../element/block/BasicBlock";
import {FloorBlock} from "../element/block/FloorBlock";
import {GenericElement} from "../element/GenericElement";
import {BarrierBlock} from "../element/block/BarrierBlock";
import {BounceBlock} from "../element/block/BounceBlock";

/**
 * This file is used to store all blocks that are available in the editor.
 * This is used to serialize and deserialize the chunk elements.
 * Left: Name of block type in API JSON
 * Right: React component of block type
 */
export const allElements: { [key: string]: React.ComponentType<any> } = {
    default: GenericElement,
    BarrierBlock: BarrierBlock,
    BasicBlock: BasicBlock,
    BouncerBlock: BounceBlock,
    FloorBlock: FloorBlock,
}