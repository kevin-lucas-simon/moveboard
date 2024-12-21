import {RigidBody} from "@react-three/rapier";
import {NewElementModel} from "../NewElementModel";
import {Vector3} from "three";

export type NewBounceBlockProps = NewElementModel & {
    diameter: number,
    intensity: number,
}

/**
 * Bouncer block that bounces the player on collision
 * @param props
 * @param props.diameter diameter of the bouncer
 * @param props.intensity expected intensity of the bounce
 * @constructor
 */
export function NewBounceBlock(props: NewBounceBlockProps) {
    // TODO implement logic for bouncing (see BouncerBlock.tsx)

    return (
        <RigidBody
            name={"Bouncer"}
            position={new Vector3().copy(props.position)}
            type={"fixed"}
            colliders={"ball"}
            // onCollisionEnter={onCollision}
        >
            <mesh>
                <sphereGeometry args={[props.diameter/2]}/>
                <meshStandardMaterial color={"grey"} />
            </mesh>
        </RigidBody>
    );
}
