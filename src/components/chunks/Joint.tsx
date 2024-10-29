import {Edges} from "@react-three/drei";
import {CuboidCollider} from "@react-three/rapier";
import {JointModel} from "../model/JointModel";
import {Player} from "../entities/Player";
import {IntersectionExitPayload} from "@react-three/rapier/dist/declarations/src/types";
import {Level, useLevelContext} from "./Level";
import {useDebug} from "../hooks/useDebug";
import {useChunkPosition} from "../hooks/useChunkPosition";
import {useVector3} from "../util/toVector3";
import {Vector3} from "three";

export type JointProps = {
    joint: JointModel,
}

export function Joint(props: JointProps) {
    const position = useVector3(props.joint.position)
    const dimension = useVector3(props.joint.dimension)

    const worldPosition = useChunkPosition(position)
    const onIntersectionExitFunction = useJointIntersectionChunkLeavingLogic(props.joint)
    const debug = useDebug()

    if (!worldPosition) {
        return null
    }

    return (
        <>
            <CuboidCollider
                sensor={true}
                onIntersectionExit={onIntersectionExitFunction}
                args={dimension.clone().multiplyScalar(0.5).toArray()}
                position={worldPosition}
            />
            {debug?.visible_joint &&
                <group position={worldPosition}>
                    <mesh>
                        <sphereGeometry args={[0.05]}/>
                        <meshStandardMaterial color={"green"} />
                    </mesh>
                    <mesh>
                        <boxGeometry args={dimension.toArray()} />
                        <meshPhongMaterial color={"green"} opacity={0.25} transparent />
                        <Edges color={"black"} />
                    </mesh>
                </group>
            }
        </>
    );
}

function useJointIntersectionChunkLeavingLogic(joint: JointModel) {
    const levelSetActiveChunkFunction = useLevelContext()?.function.setActiveChunk
    // don't like this useChunkPosition(), but it makes the hook more decoupled
    // maybe we can put the offset out of the hook and build a second one for caching?
    const chunkCenterWorldPosition = useChunkPosition()

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
        const jointDistanceToChunkCenter = new Vector3().copy(joint.position).length()

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