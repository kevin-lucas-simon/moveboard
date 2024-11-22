import {NewFloorBlockModel} from "../NewElementModel";
import {NewBasicBlock} from "./NewBasicBlock";

export type NewFloorBlockType = NewFloorBlockModel;
export function NewFloorBlock(props: NewFloorBlockType) {
    return (
        <NewBasicBlock {...props} />
    );
}
