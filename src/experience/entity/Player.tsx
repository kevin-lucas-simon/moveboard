import {RapierRigidBody, RigidBody} from "@react-three/rapier";
import {Vector3, Vector3Like} from "three";
import {useDebugSettings} from "../debug/settings/DebugSettingsProvider";
import {RefObject, useRef} from "react";

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
    const isEditingMode = useDebugSettings().isEditingMode;
    // use a ref to store the spawn position so it doesn't change on re-renders
    const spawnPosition = useRef(new Vector3().copy(props.spawnPosition));

    return (
        /* restitution -> bounce, linearDumping -> Luftbremsung, angularDamping -> Bodenbremsung */
        <RigidBody
            ref={props.playerRef}
            name={Player.name}
            key={isEditingMode ? JSON.stringify(props.spawnPosition) : Player.name}
            position={isEditingMode ? new Vector3().copy(props.spawnPosition) : spawnPosition.current}
            type={isEditingMode ? "fixed" : "dynamic"}
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
