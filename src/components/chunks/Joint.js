import {Vector3} from "three";
import {useChunk} from "../chunks/Chunk";
import {Edges} from "@react-three/drei";
import {useEffect, useState} from "react";

export function Joint({
    chunk,
    position = new Vector3(0,0,0),
    dimension = new Vector3(1,1,1),
}) {
    const chunkContext = useChunk()
    const chunkPosition = useChunk().variables.position
    const [worldPosition, setWorldPosition] = useState(new Vector3())

    // register joint
    useEffect(() => {
        if (!chunk?.name) {
            console.error("Joint: chunk name is missing!")
        }
        chunkContext.function.registerJoint({
            neighbour: chunk.name,
            position: position,
            dimension: dimension,
        })
    }, [])

    // world position
    useEffect(() => {
        setWorldPosition(new Vector3().copy(position).add(chunkPosition))
    }, [chunkPosition, position]);

    return (
        <group position={worldPosition}>
            <mesh>
                <sphereGeometry args={[0.05]}/>
                <meshStandardMaterial color={"green"} />
            </mesh>
            <mesh>
                <boxGeometry args={dimension.toArray()} />
                <meshPhongMaterial color={"green"} opacity={0.25} transparent/>
                <Edges color={"black"} />
            </mesh>
        </group>
    )
}
