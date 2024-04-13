import {useRef} from "react";
import {RigidBody} from "@react-three/rapier";

export function ControlledPlane() {
    const rigidBody = useRef();

    return (
        <>
            <RigidBody type={"fixed"}>
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[5, 1, 5]} />
                    <meshStandardMaterial color={'green'} />
                </mesh>
            </RigidBody>

            <RigidBody ref={rigidBody} colliders={"ball"} canSleep={false}>
                <mesh position={[0, 1, 0]}>
                    <sphereGeometry args={[0.5]}/>
                    <meshStandardMaterial color={"hotpink"} />
                </mesh>
            </RigidBody>
        </>
    )
}
