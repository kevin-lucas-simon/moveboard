import React from "react";
import {NewBasicBlock} from "./block/NewBasicBlock";
import {NewFloorBlock} from "./block/NewFloorBlock";
import {NewUnknownElement} from "./NewUnknownElement";

/**
 * This file is used to store all blocks that are available in the editor.
 * This is used to serialize and deserialize the chunk elements.
 * Left: Name of block type in API JSON
 * Right: React component of block type
 */
export const allElements: { [key: string]: React.ComponentType<any> } = {
    default: NewUnknownElement,
    BasicBlock: NewBasicBlock,
    FloorBlock: NewFloorBlock,
}