import {RigidBody} from "@react-three/rapier";
import {useKeyboardControls} from "@react-three/drei";
import {Vector3} from "three";
import {useFrame} from "@react-three/fiber";
import {useEffect, useRef} from "react";

export function PlayerBall({position = [0, 1, 0]}) {
    const rigidBody = useRef()
    const speedFactor = 2
    const jumpFactor = 10
    const keyPressed = {
        top: useKeyboardControls(state => state.top),
        bottom: useKeyboardControls(state => state.bottom),
        left: useKeyboardControls(state => state.left),
        right: useKeyboardControls(state => state.right),
        jump: useKeyboardControls(state => state.jump),
    }

    useFrame((state, delta) => {
        if (typeof rigidBody.current.applyImpulse !== "function") {
            return
        }
        rigidBody.current.applyImpulse({
            x: (keyPressed.right - keyPressed.left) * speedFactor * delta,
            y: keyPressed.jump * jumpFactor * delta,
            z: (keyPressed.bottom - keyPressed.top) * speedFactor * delta,
        })
    })

    return (
        /* restitution -> bounce, linearDumping -> Luftbremsung, angularDamping -> Bodenbremsung */
        <RigidBody ref={rigidBody} colliders={"ball"} canSleep={false} restitution={0.98}>
            <mesh position={position}>
                <sphereGeometry args={[0.5]}/>
                <meshStandardMaterial color={"hotpink"} />
            </mesh>
        </RigidBody>
    )
}
