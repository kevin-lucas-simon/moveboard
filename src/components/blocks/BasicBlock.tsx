import {RigidBody} from "@react-three/rapier";
import {Vector3Like} from "three";
import {useChunkPosition} from "../hooks/useChunkPosition";
import {useVector3} from "../serializer/toVector3";

export type BasicBlockProps = {
    position: Vector3Like,
    dimension: Vector3Like,
    color?: string,
}

/**
 * Basic block with fixed position
 * @param props
 * @constructor
 */
export function BasicBlock(props: BasicBlockProps) {
    const position = useVector3(props.position)
    const dimension = useVector3(props.dimension)

    const worldPosition = useChunkPosition(position)
    if (!worldPosition) {
        return null
    }

    return (
        <RigidBody position={worldPosition.toArray()} type={"fixed"}>
            <mesh>
                <boxGeometry args={dimension.toArray()} />
                <meshStandardMaterial color={props.color ?? "grey"} />
            </mesh>
        </RigidBody>
    );
}
