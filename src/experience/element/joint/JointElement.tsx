import {JointModel} from "../../../data/model/element/joint/JointModel";
import {Vector3} from "three";
import {CuboidCollider} from "@react-three/rapier";
import {IntersectionExitPayload} from "@react-three/rapier/dist/declarations/src/types";
import {Player} from "../../entity/Player";
import {useDebugSettings} from "../../input/DebugSettingsProvider";
import {ChunkID} from "../../../data/model/world/ChunkModel";

export type JointProps = JointModel & {
    inActiveChunk: boolean,
    chunkPosition: Vector3,
    onChunkLeave: (neighbour: ChunkID|null) => void,
}

export function JointElement(props: JointProps) {
    const isVisible = useDebugSettings().displayEditorFeatures;

    const emitEventWhenLeavingChunk = (event: IntersectionExitPayload) => {
        // if we are the neighbour chunk joint we do nothing
        if (!props.inActiveChunk) {
            return;
        }

        // is the intersecting object our player?
        if (event.other.rigidBodyObject?.name !== Player.name) {
            return
        }

        // get player and joint relative coordinates to chunk center
        const playerWorldPosition = event.other.rigidBodyObject.position.clone()
        const playerDistanceToChunkCenter = playerWorldPosition.clone().distanceTo(props.chunkPosition)
        const jointDistanceToChunkCenter = new Vector3().copy(props.position).distanceTo(props.chunkPosition)

        // is it leaving our chunk?
        const isLeavingJointChunk = playerDistanceToChunkCenter > jointDistanceToChunkCenter;
        if (!isLeavingJointChunk) {
            return;
        }

        // emit event with the entered neighbour chunk
        props.onChunkLeave(props.neighbour);
    }

    return (
        <>
            <CuboidCollider
                sensor={true}
                onIntersectionExit={emitEventWhenLeavingChunk}
                position={new Vector3().copy(props.position)}
                args={new Vector3().copy(props.dimension).multiplyScalar(0.5).toArray()}
            />

            {isVisible && props.inActiveChunk &&
                <group position={new Vector3().copy(props.position)}>
                    <mesh>
                        <sphereGeometry args={[0.05]}/>
                        <meshStandardMaterial color={"green"}/>
                    </mesh>
                    <mesh>
                        <boxGeometry args={new Vector3().copy(props.dimension).toArray()}/>
                        <meshPhongMaterial color={"green"} opacity={0.25} transparent/>
                    </mesh>
                </group>
            }
        </>
    );
}
