import {Vector3} from "three";
import {CollisionEnterPayload, RigidBody} from "@react-three/rapier";
import {useChunkPosition} from "../hooks/useChunkPosition";
import {Player} from "../entities/Player";
import {useState} from "react";
import {useFrame} from "@react-three/fiber";

export type BouncerBlockProps = {
    position: Vector3,
    diameter?: number,
    intensity?: number,
}

export function BouncerBlock(props: BouncerBlockProps) {
    const worldPosition = useChunkPosition(props.position)
    const [bounceAnimation, setBounceAnimation] = useState(0)

    useFrame((state, delta) => {
        if (bounceAnimation > 0) {
            setBounceAnimation(Math.max(0, bounceAnimation - delta * 5))
        }
    })

    if (!worldPosition) {
        return null
    }

    const diameter = props.diameter ?? 1
    const intensity = 1 + (props.intensity ?? 1) / 10

    const bounceIntensity = Math.pow(diameter+intensity, 2)
    const bounceDiameter = diameter*intensity

    console.log(diameter, bounceDiameter, bounceIntensity)

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
        const bounceDirectionVector = playerPosition.clone()
            .sub(bouncerPosition)
            .normalize()
            .multiplyScalar(bounceIntensity)

        // apply impulse to player
        const playerRigidBody = event.other.rigidBody
        if (!playerRigidBody) {
            return
        }
        playerRigidBody.applyImpulse(bounceDirectionVector, true)

        // set animation
        setBounceAnimation(1)
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
                <sphereGeometry args={[diameter/2 + bounceAnimation * (bounceDiameter-diameter)]}/>
                <meshStandardMaterial color={"grey"} />
            </mesh>
        </RigidBody>
    );
}