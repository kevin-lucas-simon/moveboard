import {Vector3} from "three";
import {RigidBody} from "@react-three/rapier";
import {useChunk} from "../chunks/Chunk";
import {useEffect, useState} from "react";

export function BasicBlock({
    position = new Vector3(0,0,0),
    dimension = new Vector3(1,1,1),
    color = "grey"
}) {
    const chunkPosition = useChunk().variables.position
    const [worldPosition, setWorldPosition] = useState(new Vector3(0,0,0))

    useEffect(() => {
        setWorldPosition(new Vector3().copy(position).add(chunkPosition))
    }, [chunkPosition, position]);

    return (
        <RigidBody position={worldPosition.toArray()} type={"fixed"}>
            <mesh>
                <boxGeometry args={dimension.toArray()} />
                <meshStandardMaterial color={color} />
            </mesh>
        </RigidBody>
    )
}