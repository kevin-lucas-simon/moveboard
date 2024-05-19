import {RigidBody} from "@react-three/rapier";
import {useChunkWorldPosition} from "../chunks/Chunk";
import {Vector3} from "three";
import {useChunkDimensionRegister} from "../hooks/useChunkDimension";
import {useMemo} from "react";

export type BasicBlockProps = {
    position: Vector3,
    dimension: Vector3,
    color?: string,
}

export function BasicBlock(props: BasicBlockProps) {
    const worldPosition = useChunkWorldPosition(props.position)

    return (
        <RigidBody position={worldPosition.toArray()} type={"fixed"}>
            <mesh>
                <boxGeometry args={props.dimension.toArray()} />
                <meshStandardMaterial color={props.color ?? "grey"} />
            </mesh>
        </RigidBody>
    );
}
