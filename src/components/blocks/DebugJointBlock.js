import {Vector3} from "three";
import {BasicBlock} from "./BasicBlock";

export function DebugJointBlock({
    key, // TODO key muss weg
    position = new Vector3(0,0,0),
    dimension = new Vector3(1,1,1),
}) {
    return (
        // TODO bald eigene Implementierung einrichten
        <BasicBlock key={key} position={position} dimension={dimension} color={"#bada55"} />
    )
}