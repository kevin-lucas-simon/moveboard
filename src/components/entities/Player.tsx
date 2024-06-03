import {RigidBody} from "@react-three/rapier";
import {Vector3} from "three";

export type PlayerProps = {
    position: Vector3,
}

export function Player(props: PlayerProps) {
    return (
        /* restitution -> bounce, linearDumping -> Luftbremsung, angularDamping -> Bodenbremsung */
        <RigidBody
            name={Player.name}
            position={props.position}
            colliders={"ball"}
            canSleep={false}
            restitution={0.98}
        >
            <mesh>
                <sphereGeometry args={[0.5]}/>
                <meshStandardMaterial color={"hotpink"} />
            </mesh>
        </RigidBody>
    )
}
