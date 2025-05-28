import {RapierRigidBody, RigidBody} from "@react-three/rapier";
import {Vector3, Vector3Like} from "three";
import {useDebugSettings} from "../input/DebugSettingsProvider";
import {RefObject} from "react";

export type PlayerProps = {
    spawnPosition: Vector3Like,
    playerRef: RefObject<RapierRigidBody>,
}

/**
 * Player as a simple sphere
 * @param props
 * @constructor
 */
export function Player(props: PlayerProps) {
    const isEditingMode = useDebugSettings().isEditingMode

    if (isEditingMode) {
        return (
            <mesh position={new Vector3().copy(props.spawnPosition)}>
                <sphereGeometry args={[0.5]}/>
                <meshPhongMaterial color={"hotpink"} opacity={0.8} transparent/>
            </mesh>
        )
    }

    return (
        /* restitution -> bounce, linearDumping -> Luftbremsung, angularDamping -> Bodenbremsung */
        <RigidBody
            ref={props.playerRef}
            name={Player.name}
            position={new Vector3().copy(props.spawnPosition)}
            colliders={"ball"}
            canSleep={false}
            restitution={0.98}
        >
            <mesh>
                <sphereGeometry args={[0.5]}/>
                <meshStandardMaterial color={"hotpink"}/>
            </mesh>
        </RigidBody>
    )
}
