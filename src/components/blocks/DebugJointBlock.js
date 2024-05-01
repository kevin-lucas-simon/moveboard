import {Vector3} from "three";
import {BasicBlock} from "./BasicBlock";

export function DebugJointBlock({
    position = new Vector3(0,0,0),
    dimension = new Vector3(1,1,1),
}) {
    return (
        // TODO bald eigene Implementierung einrichten
        <BasicBlock position={position} dimension={dimension} color={"#bada55"} />
    )
}