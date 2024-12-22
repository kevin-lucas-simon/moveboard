import {BasicBlock, BasicBlockDefault, BasicBlockModel} from "./BasicBlock";

export type FloorBlockModel = BasicBlockModel
export const FloorBlockDefault: FloorBlockModel = {
    ...BasicBlockDefault,
    type: FloorBlock.name,
    color: "red",
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
