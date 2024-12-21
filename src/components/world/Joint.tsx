import {JointModel} from "../model/JointModel";
import {Vector3} from "three";
import {useDebug} from "../hooks/useDebug";
import {CuboidCollider} from "@react-three/rapier";
import {IntersectionExitPayload} from "@react-three/rapier/dist/declarations/src/types";
import {Player} from "../entities/Player";

export type JointProps = JointModel & {
    inActiveChunk: boolean,
    chunkPosition: Vector3,
    onChunkLeave: (neighbour: string) => void,
}

export function Joint(props: JointProps) {
    const debug = useDebug();

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

            {debug?.visible_joint &&
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
