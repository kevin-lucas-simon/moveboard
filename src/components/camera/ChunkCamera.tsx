import {useEffect, useRef} from "react";
import {OrbitControls, PerspectiveCamera as DreiPerspectiveCamera} from "@react-three/drei";
import { PerspectiveCamera } from "three";
import {useLevelContext} from "../chunks/Level";

export function ChunkCamera() {
    const cameraRef = useRef<PerspectiveCamera>(null)

    const activeChunk = useLevelContext()?.activeChunk ?? ""
    const chunkPosition = useLevelContext()?.renderedChunkPositions[activeChunk]
    const chunkDimensions = useLevelContext()?.chunkDimensions[activeChunk]

    useEffect(() => {
        // check if values are available
        if (!cameraRef.current || !chunkPosition || !chunkDimensions) {
            return
        }

        // calculate distance via tangens (alpha = a / b, a = chunksize / 2, alpha = fov / 2)
        const alpha = cameraRef.current.fov / 2
        const a = chunkDimensions.dimension.x / 2
        const distance_b = a / Math.tan(alpha * Math.PI / 180)

        // set camera position and rotation
        cameraRef.current.rotation.set(-Math.PI/2, 0, 0)
        cameraRef.current.position.set(
            chunkPosition.x,
            chunkPosition.y + chunkDimensions.maximalPosition.y + distance_b,
            chunkPosition.z
        )
    }, [cameraRef, chunkPosition, chunkDimensions])

    return (
        <>
            <DreiPerspectiveCamera
                makeDefault
                ref={cameraRef}
                fov={45} near={0.1} far={1000}
            />
            <OrbitControls target={chunkPosition}/>
        </>
    );
}