import {RigidBody} from "@react-three/rapier";
import {useChunk} from "../chunks/Chunk";
import {Vector3} from "three";
import {useEffect, useState} from "react";

export type BasicBlockProps = {
    position: Vector3,
    dimension: Vector3,
    color: string|undefined,
}

export function BasicBlock(props: BasicBlockProps) {
    const chunkPosition
        = useChunk()?.variables.position ?? new Vector3()
    const [worldPosition, setWorldPosition]
        = useState(new Vector3(0,0,0))

    useEffect(() => {
        setWorldPosition(new Vector3().copy(props.position).add(chunkPosition))
    }, [chunkPosition, props.position]);

    return (
        <RigidBody position={worldPosition.toArray()} type={"fixed"}>
            <mesh>
                <boxGeometry args={props.dimension.toArray()} />
                <meshStandardMaterial color={props.color ?? "grey"} />
            </mesh>
        </RigidBody>
    );
}
