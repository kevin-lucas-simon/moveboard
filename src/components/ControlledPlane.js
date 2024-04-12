import {useContext, useEffect, useRef} from "react";
import {DeviceRotationContext} from "./UserControls";
import {quat, RigidBody, vec3} from "@react-three/rapier";

export function ControlledPlane() {
    const rigidBody = useRef();
    const deviceRotation = useContext(DeviceRotationContext);

    useEffect(() => {
        if (rigidBody.current) {
            const position = vec3(rigidBody.current.translation());
            const quaternion = quat(rigidBody.current.rotation());

            rigidBody.current.setTranslation(position, true);
            rigidBody.current.setRotation(quaternion, true);
            rigidBody.current.setAngvel({ x: 0, y: 2, z: 0 }, true);
        }
    }, []);

    return (
        <>
            <RigidBody ref={rigidBody} type={"fixed"} rotation={[deviceRotation.x, deviceRotation.y, deviceRotation.z]}>
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[5, 1, 5]} />
                    <meshStandardMaterial color={'green'} />
                </mesh>
            </RigidBody>

            <RigidBody colliders={"ball"}>
                <mesh position={[0, 1, 0]}>
                    <sphereGeometry args={[0.5]}/>
                    <meshStandardMaterial color={"hotpink"} />
                </mesh>
            </RigidBody>
        </>
    )
}
