import {JointModel} from "./model/JointModel";
import {useVector3, useWorldPosition} from "../hooks/toVector3";
import {useDebug} from "../hooks/useDebug";
import {CuboidCollider} from "@react-three/rapier";
import {useLevelContext} from "./Level";
import {useChunkContext} from "./Chunk";
import {IntersectionExitPayload} from "@react-three/rapier/dist/declarations/src/types";
import {Player} from "../entities/Player";
import {Vector3} from "three";

export type JointProps = {
    joint: JointModel,
}

export function Joint(props: JointProps) {
    const levelContext = useLevelContext();
    const chunkContext = useChunkContext();

    const position = useWorldPosition(props.joint.position)
    const dimension = useVector3(props.joint.dimension)
    const debug = useDebug()

    const emitEventWhenLeavingChunk = (event: IntersectionExitPayload) => {
        // if we are the neighbour chunk joint we do nothing
        if (!chunkContext.active) {
            return;
        }

        // is the intersecting object our player?
        if (event.other.rigidBodyObject?.name !== Player.name) {
            return
        }

        // get player and joint relative coordinates to chunk center
        const playerWorldPosition = event.other.rigidBodyObject.position.clone()
        const playerDistanceToChunkCenter = playerWorldPosition.clone().distanceTo(chunkContext.position)
        const jointDistanceToChunkCenter = new Vector3().copy(props.joint.position).length()

        // is it leaving our chunk?
        const isLeavingJointChunk = playerDistanceToChunkCenter > jointDistanceToChunkCenter;
        if (!isLeavingJointChunk) {
            return;
        }

        // register new chunk
        levelContext.function.setActiveChunk(props.joint.neighbour);
    }

    return (
        <>
            <CuboidCollider
                sensor={true}
                onIntersectionExit={emitEventWhenLeavingChunk}
                position={position}
                args={dimension.clone().multiplyScalar(0.5).toArray()}
            />
            {debug?.visible_joint &&
                <group position={position}>
                    <mesh>
                        <sphereGeometry args={[0.05]}/>
                        <meshStandardMaterial color={"green"} />
                    </mesh>
                    <mesh>
                        <boxGeometry args={dimension.toArray()} />
                        <meshPhongMaterial color={"green"} opacity={0.25} transparent />
                    </mesh>
                </group>
            }
        </>
    );
}
