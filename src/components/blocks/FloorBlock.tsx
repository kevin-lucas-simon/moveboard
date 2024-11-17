import {BasicBlock, BasicBlockProps} from "./BasicBlock";

/**
 * Block that is guarantied visible in camera chunk view.
 * Chunk dimension logic is handled by the chunk renderer.
 * @param props
 * @constructor
 */
export function FloorBlock(props: BasicBlockProps) {
    return (
        <BasicBlock {...props} />
    )
}
