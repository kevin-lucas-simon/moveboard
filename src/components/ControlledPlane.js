import {useContext} from "react";
import {RotationContext} from "./UserControls";

export function ControlledPlane() {
    const rotationContext = useContext(RotationContext)

    return (
        <>
            <mesh position={[0, 0, 0]} rotation={rotationContext}>
                <boxGeometry args={[5, 1, 5]} />
                <meshStandardMaterial color={'green'} />
            </mesh>
        </>
    )
}
