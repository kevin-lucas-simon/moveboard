import {RigidBody} from "@react-three/rapier";
import {Vector3} from "three";
import {useChunkPosition} from "../hooks/useChunkPosition";

export type BasicBlockProps = {
    position: Vector3,
    dimension: Vector3,
    color?: string,
}

/**
 * Basic block with fixed position
 * @param props
 * @constructor
 */
export function BasicBlock(props: BasicBlockProps) {
    const worldPosition = useChunkPosition(props.position)
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
