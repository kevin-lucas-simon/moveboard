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

    const [minPosition, maxPosition] = useMemo(() => [
        props.position.clone().sub(props.dimension.clone().multiplyScalar(0.5)),
        props.position.clone().add(props.dimension.clone().multiplyScalar(0.5)),
    ], [props.position, props.dimension])
    useChunkDimensionRegister(minPosition, maxPosition)

    return (
        <RigidBody position={worldPosition.toArray()} type={"fixed"}>
            <mesh>
                <boxGeometry args={props.dimension.toArray()} />
                <meshStandardMaterial color={props.color ?? "grey"} />
            </mesh>
        </RigidBody>
    );
}
