import {NewBasicBlock, NewBasicBlockModel} from "./NewBasicBlock";

export type NewFloorBlockModel = NewBasicBlockModel

/**
 * Block that is guarantied visible in camera chunk view.
 * Chunk dimension logic is handled by the chunk renderer.
 * @param props
 * @constructor
 */
export function NewFloorBlock(props: NewFloorBlockModel) {
    return (
        <NewBasicBlock {...props} />
    );
}
