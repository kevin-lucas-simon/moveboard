import {RigidBody} from "@react-three/rapier";
import {Vector3Like} from "three";
import {useVector3, useWorldPosition} from "../hooks/toVector3";

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
    const position = useWorldPosition(props.position)
    const dimension = useVector3(props.dimension)

    return (
        <RigidBody position={position.toArray()} type={"fixed"}>
            <mesh>
                <boxGeometry args={dimension.toArray()} />
                <meshStandardMaterial color={props.color ?? "grey"} />
            </mesh>
        </RigidBody>
    );
}
