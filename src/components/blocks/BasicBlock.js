import {Vector3} from "three";
import {RigidBody} from "@react-three/rapier";

export function BasicBlock({
    position = new Vector3(0,0,0),
    dimension = new Vector3(1,1,1),
    color = "grey"
}) {
    return (
        <RigidBody type={"fixed"}>
            <mesh position={[
                position.x,
                position.y,
                position.z,
            ]}>
                <boxGeometry args={[
                    Math.abs(dimension.x),
                    Math.abs(dimension.y),
                    Math.abs(dimension.z),
                ]} />
                <meshStandardMaterial color={color} />
            </mesh>
        </RigidBody>
    )
}