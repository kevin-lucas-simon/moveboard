import {RigidBody} from "@react-three/rapier";
import {useChunkRenderedWorldPosition} from "../chunks/Chunk";
import {Vector3} from "three";

export type BasicBlockProps = {
    position: Vector3,
    dimension: Vector3,
    color?: string,
}

export function BasicBlock(props: BasicBlockProps) {
    const worldPosition = useChunkRenderedWorldPosition(props.position)
    if (!worldPosition) {
        return null
    }

    return (
        <RigidBody position={worldPosition.toArray()} type={"fixed"}>
            <mesh>
                <boxGeometry args={props.dimension.toArray()} />
                <meshStandardMaterial color={props.color ?? "grey"} />
            </mesh>
        </RigidBody>
    );
}
