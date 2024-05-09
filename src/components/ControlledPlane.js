import {RigidBody} from "@react-three/rapier";
import {Player} from "./entities/Player";

export function ControlledPlane() {
    const box = {
        x: 5,
        y: 3,
        z: 5,
        thickness: 1,
        color: "#dddddd",
    }

    return (
        <>
            {/* ball */}
            <Player />

            {/* floor */}
            <RigidBody type={"fixed"}>
                <mesh position={[0, -box.thickness/2, 0]}>
                    <boxGeometry args={[
                        box.x + box.thickness,
                        box.thickness,
                        box.z + box.thickness,
                    ]} />
                    <meshStandardMaterial color={'green'} />
                </mesh>
            </RigidBody>

            {/* short walls on x-axis */}
            <RigidBody type={"fixed"}>
                <mesh position={[
                    box.x/2 + box.thickness,
                    box.y/2 - box.thickness/2,
                    0,
                ]}>
                    <boxGeometry args={[
                        box.thickness,
                        box.y + box.thickness,
                        box.z + box.thickness,
                    ]} />
                    <meshStandardMaterial color={box.color} />
                </mesh>
            </RigidBody>
            <RigidBody type={"fixed"}>
                <mesh position={[
                    -(box.x/2 + box.thickness),
                    box.y/2 - box.thickness/2,
                    0,
                ]}>
                    <boxGeometry args={[
                        box.thickness,
                        box.y + box.thickness,
                        box.z + box.thickness,
                    ]} />
                    <meshStandardMaterial color={box.color} />
                </mesh>
            </RigidBody>

            {/* long walls on z-axis */}
            <RigidBody type={"fixed"}>
                <mesh position={[
                    0,
                    box.y/2 - box.thickness/2,
                    box.z/2 + box.thickness,
                ]}>
                    <boxGeometry args={[
                        box.x + 3 * box.thickness,
                        box.y + box.thickness,
                        box.thickness,
                    ]} />
                    <meshStandardMaterial color={box.color} />
                </mesh>
            </RigidBody>
            <RigidBody type={"fixed"}>
                <mesh position={[
                    0,
                    box.y/2 - box.thickness/2,
                    -(box.z/2 + box.thickness),
                ]}>
                    <boxGeometry args={[
                        box.x + 3 * box.thickness,
                        box.y + box.thickness,
                        box.thickness,
                    ]} />
                    <meshStandardMaterial color={box.color} />
                </mesh>
            </RigidBody>

            {/* ceiling */}
            <RigidBody type={"fixed"}>
                <mesh position={[0, box.y+box.thickness/2, 0]}>
                    <boxGeometry args={[
                        box.x + 3 * box.thickness,
                        box.thickness,
                        box.z + 3 * box.thickness,
                    ]} />
                    <meshPhongMaterial color={'lightblue'} opacity={0.1} transparent="true"/>
                </mesh>
            </RigidBody>
        </>
    )
}
