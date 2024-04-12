import {useContext, useRef} from "react";
import {useFrame} from "@react-three/fiber";
import {PerspectiveCamera} from "@react-three/drei";
import {DeviceRotationContext} from "./UserControls";
import {Vector3} from "three";

export function FollowCamera({target, distance}) {
    const cameraRef = useRef()
    const deviceRotation = useContext(DeviceRotationContext)

    useFrame(() => {
        if (target && cameraRef) {
            // camera position
            const vector = new Vector3(0,distance ?? 5,0)
            vector.applyEuler(deviceRotation)
            cameraRef.current.position.set(
                target.position.x + vector.x,
                target.position.y + vector.y,
                target.position.z + vector.z,
            );

            // camera rotation
            cameraRef.current.rotation.set(
                deviceRotation.x,
                deviceRotation.y,
                deviceRotation.z,
            )
            cameraRef.current.rotateX(-Math.PI/2)
        }
    })

    return (
        <PerspectiveCamera
            makeDefault ref={cameraRef}
            fov={75} near={0.1} far={1000}
            rotation={[-Math.PI/2, 0, 0]}
        />
    )
}
