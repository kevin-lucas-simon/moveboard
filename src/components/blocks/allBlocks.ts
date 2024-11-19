import * as React from "react";
import {BasicBlock} from "./BasicBlock";
import {FloorBlock} from "./FloorBlock";
import {BarrierBlock} from "./BarrierBlock";
import {WallWithHoleStructure} from "../../data/TestLevel/structure/WallWithHoleStructure";
import {BouncerBlock} from "./BouncerBlock";

/**
 * This file is used to store all blocks that are available in the editor.
 * This is used to serialize and deserialize the blocks.
 */
export const allBlocks: { [key: string]: React.ComponentType<any> } = {
    [BasicBlock.name]: BasicBlock,
    [FloorBlock.name]: FloorBlock,
    [BarrierBlock.name]: BarrierBlock,
    [WallWithHoleStructure.name]: WallWithHoleStructure,
    [BouncerBlock.name]: BouncerBlock,
}