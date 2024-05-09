import {Edges} from "@react-three/drei";
import {CuboidCollider} from "@react-three/rapier";
import {useChunkWorldPosition} from "./Chunk";
import {JointModel} from "../model/JointModel";
import {Player} from "../entities/Player";
import {IntersectionExitPayload} from "@react-three/rapier/dist/declarations/src/types";
import {Level, useLevelContext} from "./Level";

export type JointProps = {
    joint: JointModel,
}

export function Joint(props: JointProps) {
    const worldPosition = useChunkWorldPosition(props.joint.position)
    const levelSetActiveChunkFunction = useLevelContext()?.function.setActiveChunk

    function onIntersectionExit(event: IntersectionExitPayload) {
        // is the intersecting object our player?
        if (event.other.rigidBodyObject?.name !== Player.name) {
            return
        }

        // get player and joint relative coordinates to chunk center
        const playerWorldPosition = event.other.rigidBodyObject.position.clone()
        const chunkCenterWorldPosition = worldPosition.clone().sub(props.joint.position)

        const playerDistanceToChunkCenter = playerWorldPosition.clone().distanceTo(chunkCenterWorldPosition)
        const jointDistanceToChunkCenter = props.joint.position.length()

        // is it leaving our chunk?
        const isLeavingJointChunk = playerDistanceToChunkCenter > jointDistanceToChunkCenter
        if (!isLeavingJointChunk) {
            return;
        }

        // register new active chunk
        if (!levelSetActiveChunkFunction) {
            throw Error(onIntersectionExit.name + " must be within " + Level.name)
        }
        levelSetActiveChunkFunction(props.joint.neighbour)
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