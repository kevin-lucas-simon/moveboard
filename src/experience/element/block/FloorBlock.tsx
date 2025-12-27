import {BasicBlock} from "./BasicBlock";
import {FloorBlockDefault, FloorBlockModel} from "../../../data/model/element/block/FloorBlockModel";
import {Angle} from "../../../data/model/Angle";

export function FloorBlock(props: FloorBlockModel = FloorBlockDefault) {
    return (
        <BasicBlock {...props} rotation={new Angle()} />
    );
}
