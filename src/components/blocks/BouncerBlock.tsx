import {Vector3} from "three";
import {CollisionEnterPayload, RigidBody} from "@react-three/rapier";
import {useChunkPosition} from "../hooks/useChunkPosition";
import {Player} from "../entities/Player";

export type BouncerBlockProps = {
    position: Vector3,
    diameter?: number,
    intensity?: number,
}

export function BouncerBlock(props: BouncerBlockProps) {
    const worldPosition = useChunkPosition(props.position)
    if (!worldPosition) {
        return null
    }

    function onCollision(event: CollisionEnterPayload) {
        // is the intersecting object our player?
        if (event.other.rigidBodyObject?.name !== Player.name) {
            return
        }

        // get player and bouncer position
        const playerPosition = event.other.rigidBodyObject.position
        const bouncerPosition = event.target.rigidBodyObject?.position

        // calculate bounce direction vector
        if(!playerPosition || !bouncerPosition) {
            return;
        }
        const bounceDirectionVector = bouncerPosition.clone()
            .sub(playerPosition)
            .normalize()
            .multiplyScalar(props.intensity ?? 5)

        // apply impulse to player
        const playerRigidBody = event.other.rigidBody
        if (!playerRigidBody) {
            return
        }
        playerRigidBody.applyImpulse(bounceDirectionVector, true)
    }

    return (
        <RigidBody
            name={"Bouncer"}
            position={worldPosition.toArray()}
            type={"fixed"}
            colliders={"ball"}
            onCollisionEnter={onCollision}
        >
            <mesh>
                <sphereGeometry args={[props.diameter ?? 1]}/>
                <meshStandardMaterial color={"grey"} />
            </mesh>
        </RigidBody>
    );
}