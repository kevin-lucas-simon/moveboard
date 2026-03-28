import {useSensorReactor} from "../../reducer/SensorReactorProvider";
import {BasicBlock} from "./BasicBlock";
import {DoorBlockModel} from "../../../data/model/element/block/DoorBlockModel";

export function DoorBlock(props: DoorBlockModel) {
    const active = useSensorReactor();

    if (active) {
        return <></>
    }

    return (
        <BasicBlock {...props} color={"secondary"} />
    );
}
