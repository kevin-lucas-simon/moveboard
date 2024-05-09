import {Edges} from "@react-three/drei";
import {RigidBody} from "@react-three/rapier";
import {useChunkContext, useChunkWorldPosition} from "./Chunk";
import {JointModel} from "../model/JointModel";

export type JointProps = {
    joint: JointModel,
}

export function Joint(props: JointProps) {
    const worldPosition = useChunkWorldPosition(props.joint.position)
    const chunkName = useChunkContext()?.chunk.name

    function onCollisionExit() {
        console.log("onCollisionExit", chunkName, props)
    }

    return (
        <RigidBody position={worldPosition} type={"fixed"} sensor={true} onCollisionExit={onCollisionExit}>
            <mesh>
                <sphereGeometry args={[0.05]}/>
                <meshStandardMaterial color={"green"} />
            </mesh>
            <mesh>
                <boxGeometry args={props.joint.dimension.toArray()} />
                <meshPhongMaterial color={"green"} opacity={0.25} transparent />
                <Edges color={"black"} />
            </mesh>
        </RigidBody>
    );
}
