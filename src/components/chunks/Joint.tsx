import {Edges} from "@react-three/drei";
import {CuboidCollider, RigidBody} from "@react-three/rapier";
import {useChunkWorldPosition} from "./Chunk";
import {JointModel} from "../model/JointModel";
import {Player} from "../entities/Player";
import {Vector3} from "three";
import {IntersectionExitPayload} from "@react-three/rapier/dist/declarations/src/types";

export type JointProps = {
    joint: JointModel,
}

export function Joint(props: JointProps) {
    const worldPosition = useChunkWorldPosition(props.joint.position)

    function onIntersectionExit(event: IntersectionExitPayload) {
        if (event.other.rigidBodyObject?.name !== Player.name) {
            return
        }

        const playerWorldPosition = event.other.rigidBodyObject.position.clone()
        const chunkCenterWorldPosition = worldPosition.clone().sub(props.joint.position)

        const playerDistanceToChunkCenter = playerWorldPosition.clone().distanceTo(chunkCenterWorldPosition)
        const jointDistanceToChunkCenter = props.joint.position.length()

        // const playerDistanceToChunkCenter = new Vector3().copy(playerWorldPosition).sub(chunkCenterWorldPosition)
        // const jointDistanceToChunkCenter = new Vector3().copy(props.joint.position)

        // is it leaving our chunk?
        const isLeavingJointChunk = playerDistanceToChunkCenter > jointDistanceToChunkCenter
        // if (!isLeavingJointChunk) {
        //     return;
        // }

        console.log({
            event: event,
            realPlayer: playerWorldPosition,
            realJoint: worldPosition,
            realChunk: chunkCenterWorldPosition,
            leaving: isLeavingJointChunk,
            leavingTo: props.joint.neighbour,
            distancePlayer: playerDistanceToChunkCenter,
            distanceJoint: jointDistanceToChunkCenter,
        })
    }

    return (
        <>
            <CuboidCollider
                sensor={true}
                onIntersectionExit={onIntersectionExit}
                args={props.joint.dimension.clone().multiplyScalar(0.5).toArray()}
                position={worldPosition}
            />
            <group position={worldPosition}>
                <mesh>
                    <sphereGeometry args={[0.05]}/>
                    <meshStandardMaterial color={"green"} />
                </mesh>
                <mesh>
                    <boxGeometry args={props.joint.dimension.toArray()} />
                    <meshPhongMaterial color={"green"} opacity={0.25} transparent />
                    <Edges color={"black"} />
                </mesh>
            </group>
        </>
    );
}
