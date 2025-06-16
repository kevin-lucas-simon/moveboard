import {BasicBlock} from "./BasicBlock";
import {FloorBlockDefault, FloorBlockModel} from "../../../data/model/element/block/FloorBlockModel";

export function FloorBlock(props: FloorBlockModel = FloorBlockDefault) {
    return (
        <BasicBlock {...props} />
    );
}
