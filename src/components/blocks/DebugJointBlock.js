import {Vector3} from "three";
import {BasicBlock} from "./BasicBlock";

export function DebugJointBlock({
    position = new Vector3(0,0,0),
    dimension = new Vector3(1,1,1),
}) {
    return (
        // TODO bald eigene Implementierung einrichten
        // hier wäre es gut, die position Koordinate mit einer kleinen Kugel zu kennzeichnen,
        // und die dimension vom RigidBody über halb transparenten Kasten drum
        <BasicBlock position={position} dimension={dimension} color={"#bada55"} />
    )
}