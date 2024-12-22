import {CollisionEnterPayload, RigidBody} from "@react-three/rapier";
import {ElementModel} from "../ElementModel";
import {Vector3} from "three";
import {useMemo, useState} from "react";
import {useFrame} from "@react-three/fiber";
import {Player} from "../entity/Player";

// constants for animation finetuning
const INTENSITY_PHYSIC_FACTOR = 10
const INTENSITY_ANIMATION_FACTOR = 1

export type BounceBlockModel = ElementModel & {
    diameter: number,
    intensity: number,
}

/**
 * Bouncer block that bounces the player on collision
 * @param props.position position of the bouncer
 * @param props.diameter diameter of the bouncer
 * @param props.intensity expected intensity of the bounce
 * @constructor
 */
export function BounceBlock(props: BounceBlockModel) {
    const [bounceAnimation, setBounceAnimation] = useState(0)

    // calculate bounce animation diameter related to the intensity and diameter
    const bounceAnimationDiameter = useMemo(() => {
        // to create a realistic animation, the intensity is divided by the sphere surface area (PI is ignored for simplicity
        const radiusIntensity = props.intensity / Math.pow(props.diameter, 2) * INTENSITY_ANIMATION_FACTOR
        // calculation of the animation by adding the intensity in virtual spherical volumes of 1 (PI ignored too)
        return Math.sqrt(Math.pow(props.diameter, 2) * (1 + radiusIntensity))
    }, [props.diameter, props.intensity])

    // run animation if active
    useFrame((state, delta) => {
        if (bounceAnimation > 0) {
            setBounceAnimation(Math.max(0, bounceAnimation - delta * 5))
        }
    })

    // collision event handler
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
            .multiplyScalar(props.intensity * INTENSITY_PHYSIC_FACTOR)

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
            position={new Vector3().copy(props.position)}
            type={"fixed"}
            colliders={"ball"}
            onCollisionEnter={onCollision}
        >
            <mesh>
                <sphereGeometry
                    args={[props.diameter / 2 + bounceAnimation * (bounceAnimationDiameter - props.diameter) / 2]}/>
                <meshStandardMaterial color={"grey"}/>
            </mesh>
        </RigidBody>
    );
}
