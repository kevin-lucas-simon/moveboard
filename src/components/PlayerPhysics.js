import {Physics} from "@react-three/rapier";
import {useContext} from "react";
import {DeviceRotationContext} from "./UserControls";
import {Euler, Quaternion, Vector3} from "three";

export function PlayerPhysics({children}) {
    const deviceRotation = useContext(DeviceRotationContext)

    // updates if 'deviceRotation' context updates
    const gravityForce = new Vector3(0,-9.81,0)
    if (deviceRotation) {
        // invert angle to fix x- and z-angles because gravity is looking down
        const quaternion = new Quaternion().setFromEuler(deviceRotation)
        quaternion.invert()
        gravityForce.applyEuler(new Euler().setFromQuaternion(quaternion))
    }

    return (
        <Physics gravity={[gravityForce.x, gravityForce.y, gravityForce.z]}>
            {children}
        </Physics>
    )
}
