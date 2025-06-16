import {BasicBlock, BasicBlockDefault, BasicBlockModel} from "./BasicBlock";
import {ElementType} from "../../../model/ElementModel";

export type FloorBlockModel = BasicBlockModel
export const FloorBlockDefault: FloorBlockModel = {
    ...BasicBlockDefault,
    type: ElementType.FloorBlock,
    color: "red",
    position: {x: 0, y: -1, z: 0},
}

/**
 * Block that is guarantied visible in camera chunk view.
 * Chunk dimension logic is handled by the chunk renderer.
 * @param props
 * @constructor
 */
export function FloorBlock(props: FloorBlockModel = FloorBlockDefault) {
    return (
        <BasicBlock {...props} />
    );
}
