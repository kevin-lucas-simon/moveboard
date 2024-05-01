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
                position.x + Math.abs(dimension.x)/2,
                position.y + Math.abs(dimension.y)/2,
                position.z + Math.abs(dimension.z)/2,
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