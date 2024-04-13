import {Physics} from "@react-three/rapier";
import {useContext} from "react";
import {DeviceMotionContext} from "./UserControls";

export function PlayerPhysics({children}) {
    const deviceMotion = useContext(DeviceMotionContext)

    return (
        <Physics gravity={[deviceMotion.x, deviceMotion.y, deviceMotion.z]}>
            {children}
        </Physics>
    )
}
