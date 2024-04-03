import {useContext} from "react";
import {RotationContext} from "./UserControls";

export function ControlledPlane() {
    const rotationVector = useContext(RotationContext) ?? [0,1,0]

    console.log(rotationVector)

    return (
        <>
            <mesh position={[0, 0, 0]} rotation={rotationVector}>
                <boxGeometry args={[5, 1, 5]} />
                <meshStandardMaterial color={'green'} />
            </mesh>
        </>
    )
}
