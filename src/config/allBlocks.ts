import * as React from "react";
import {BasicBlock} from "../components/blocks/BasicBlock";
import {FloorBlock} from "../components/blocks/FloorBlock";
import {BarrierBlock} from "../components/blocks/BarrierBlock";
import {WallWithHoleStructure} from "../data/TestLevel/structure/WallWithHoleStructure";
import {BouncerBlock} from "../components/blocks/BouncerBlock";

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