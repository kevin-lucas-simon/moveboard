import {CollisionEnterPayload, RigidBody} from "@react-three/rapier";
import {Color, Vector3} from "three";
import {useMemo, useState} from "react";
import {useFrame} from "@react-three/fiber";
import * as TSL from 'three/tsl';
import {Player} from "../../entity/Player";
import {BounceBlockDefault, BounceBlockModel} from "../../../data/model/element/block/BounceBlockModel";
import {useElementColoring} from "../../structure/coloring/useElementColoring";
import {useUniform} from "../../material/useUniform";
import {ColorTypes} from "../../../data/model/Color";

// constants for animation finetuning
const INTENSITY_PHYSIC_FACTOR = 10
const INTENSITY_ANIMATION_FACTOR = 1

export function BounceBlock(props: BounceBlockModel = BounceBlockDefault) {
    const accentHex = useElementColoring(props.color);
    const lightHex  = useElementColoring(ColorTypes.Light);
    const [bounceAnimation, setBounceAnimation] = useState(0)

    const accentColorUniform = useUniform<Color>(new Color(accentHex));
    const lightColorUniform  = useUniform<Color>(new Color(lightHex));

    // Concentric latitude rings — horizontal bands on the sphere surface
    const ringNode = useMemo(() => {
        const latitude    = TSL.add(TSL.mul(TSL.normalLocal.y, 0.5), 0.5); // maps -1..1 to 0..1
        const rings       = TSL.mul(latitude, 6.0);
        const ringPattern = TSL.step(0.3, TSL.fract(rings));
        return TSL.mix(accentColorUniform, lightColorUniform, ringPattern);
    }, [accentColorUniform, lightColorUniform]);

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
            key={JSON.stringify(props)}
            name={"Bouncer"}
            position={new Vector3().copy(props.position)}
            type={"fixed"}
            colliders={"ball"}
            onCollisionEnter={onCollision}
        >
            <mesh castShadow receiveShadow>
                <sphereGeometry
                    args={[props.diameter / 2 + bounceAnimation * (bounceAnimationDiameter - props.diameter) / 2]}/>
                <meshStandardNodeMaterial colorNode={ringNode} />
            </mesh>
        </RigidBody>
    );
}
