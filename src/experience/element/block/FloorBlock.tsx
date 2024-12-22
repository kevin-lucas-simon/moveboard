import {BasicBlock, BasicBlockModel} from "./BasicBlock";

export type FloorBlockModel = BasicBlockModel

/**
 * Block that is guarantied visible in camera chunk view.
 * Chunk dimension logic is handled by the chunk renderer.
 * @param props
 * @constructor
 */
export function FloorBlock(props: FloorBlockModel) {
    return (
        <BasicBlock {...props} />
    );
}
