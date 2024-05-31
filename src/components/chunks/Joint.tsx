import {Edges} from "@react-three/drei";
import {CuboidCollider} from "@react-three/rapier";
import {useChunkRenderedWorldPosition} from "./Chunk";
import {JointModel} from "../model/JointModel";
import {Player} from "../entities/Player";
import {IntersectionExitPayload} from "@react-three/rapier/dist/declarations/src/types";
import {Level, useLevelContext} from "./Level";

export type JointProps = {
    joint: JointModel,
}

export function Joint(props: JointProps) {
    const worldPosition = useChunkRenderedWorldPosition(props.joint.position)
    const onIntersectionExitFunction = useJointIntersectionChunkLeavingLogic(props.joint)

    if (!worldPosition) {
        return null
    }

    return (
        <>
            <CuboidCollider
                sensor={true}
                onIntersectionExit={onIntersectionExitFunction}
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

function useJointIntersectionChunkLeavingLogic(joint: JointModel) {
    const levelSetActiveChunkFunction = useLevelContext()?.function.setActiveChunk
    // don't like this useChunkRenderedWorldPosition(), but it makes the hook more decoupled
    // maybe we can put the offset out of the hook and build a second one for caching?
    const chunkCenterWorldPosition = useChunkRenderedWorldPosition()

    function onIntersectionExit(event: IntersectionExitPayload) {
        // check if required values are set
        if (!chunkCenterWorldPosition) {
            return
        }

        // is the intersecting object our player?
        if (event.other.rigidBodyObject?.name !== Player.name) {
            return
        }

        // get player and joint relative coordinates to chunk center
        const playerWorldPosition = event.other.rigidBodyObject.position.clone()
        const playerDistanceToChunkCenter = playerWorldPosition.clone().distanceTo(chunkCenterWorldPosition)
        const jointDistanceToChunkCenter = joint.position.length()

        // is it leaving our chunk?
        const isLeavingJointChunk = playerDistanceToChunkCenter > jointDistanceToChunkCenter
        if (!isLeavingJointChunk) {
            return;
        }

        // register new active chunk
        if (!levelSetActiveChunkFunction) {
            throw Error(onIntersectionExit.name + " must be within " + Level.name)
        }
        levelSetActiveChunkFunction(joint.neighbour)
    }

    return onIntersectionExit
}