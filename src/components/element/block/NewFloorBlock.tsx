import {NewBasicBlock, NewBasicBlockModel} from "./NewBasicBlock";

export type NewFloorBlockModel = NewBasicBlockModel

export function NewFloorBlock(props: NewFloorBlockModel) {
    return (
        <NewBasicBlock {...props} />
    );
}
