import React from "react";
import {BasicBlock} from "./block/BasicBlock";
import {FloorBlock} from "./block/FloorBlock";
import {UnknownElement} from "./UnknownElement";
import {BarrierBlock} from "./block/BarrierBlock";
import {BounceBlock} from "./block/BounceBlock";

/**
 * This file is used to store all blocks that are available in the editor.
 * This is used to serialize and deserialize the chunk elements.
 * Left: Name of block type in API JSON
 * Right: React component of block type
 */
export const allElements: { [key: string]: React.ComponentType<any> } = {
    default: UnknownElement,
    BarrierBlock: BarrierBlock,
    BasicBlock: BasicBlock,
    BouncerBlock: BounceBlock,
    FloorBlock: FloorBlock,
}