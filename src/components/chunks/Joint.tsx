import {Vector3} from "three";
import {Edges} from "@react-three/drei";
import {RigidBody} from "@react-three/rapier";

export type DebugJointBlockProps = {
    position: Vector3,
    dimension: Vector3,
}

export function Joint(props: DebugJointBlockProps) {
    function onCollisionExit() {
        console.log("onCollisionExit", props)
    }

    return (
        <RigidBody position={props.position} type={"fixed"} sensor={true} onCollisionExit={onCollisionExit}>
            <mesh>
                <sphereGeometry args={[0.05]}/>
                <meshStandardMaterial color={"green"} />
            </mesh>
            <mesh>
                <boxGeometry args={props.dimension.toArray()} />
                <meshPhongMaterial color={"green"} opacity={0.25} transparent />
                <Edges color={"black"} />
            </mesh>
        </RigidBody>
    );
}
