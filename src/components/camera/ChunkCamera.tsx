import {useEffect, useRef, useState} from "react";
import {OrbitControls, PerspectiveCamera as DreiPerspectiveCamera} from "@react-three/drei";
import {PerspectiveCamera, Vector3} from "three";
import {useLevelContext} from "../chunks/Level";
import {useFrame} from "@react-three/fiber";

export type ChunkCameraProps = {
    startHeight: number,
}

export function ChunkCamera(props: ChunkCameraProps) {
    const cameraRef = useRef<PerspectiveCamera>(null)

    const activeChunk = useLevelContext()?.activeChunk ?? ""
    const chunkPosition = useLevelContext()?.renderedChunkPositions[activeChunk]
    const chunkDimensions = useLevelContext()?.chunkDimensions[activeChunk]

    const [aimedPosition, setAimedPosition]
        = useState<Vector3>(new Vector3(0, props.startHeight, 0))
    const [transitionTime, setTransitionTime] = useState<number>(0)
    const transitionTimeInSeconds = 5

    const [targetCameraPosition, setTargetCameraPosition] = useState<Vector3>(new Vector3(0, 0, 0))
    const [targetChunkPosition, setTargetChunkPosition] = useState<Vector3>(new Vector3(0, 0, 0))
    const [actualCameraPosition, setActualCameraPosition] = useState<Vector3>(new Vector3(0, 0, 0))
    const [actualChunkPosition, setActualChunkPosition] = useState<Vector3>(new Vector3(0, 0, 0))

    useEffect(() => {
        // check if values are available
        if (!cameraRef.current || !chunkPosition || !chunkDimensions) {
            return
        }

        // calculate distance via tangens (alpha = a / b, a = chunksize / 2, alpha = fov / 2)
        const alpha = cameraRef.current.fov / 2
        const a = chunkDimensions.dimension.x / 2
        const distance_b = a / Math.tan(alpha * Math.PI / 180)

        // define camera aimed position for animation
        setAimedPosition(new Vector3(
            chunkPosition.x,
            chunkPosition.y + chunkDimensions.maximalPosition.y + distance_b,
            chunkPosition.z
        ))
        setTransitionTime(transitionTimeInSeconds)
    }, [cameraRef, chunkPosition, chunkDimensions])

    useFrame((state, delta) => {
        // check if values are available and transition is active
        if (!cameraRef.current || transitionTime <= 0) {
            return
        }

        // decrease transition time
        setTransitionTime(transitionTime - delta)
        if (transitionTime <= 0) {
            setTransitionTime(0)
        }

        // set camera position and rotation
        cameraRef.current.position.lerp(aimedPosition, 1 - transitionTime / transitionTimeInSeconds)

        console.log(cameraRef.current.position, aimedPosition, transitionTime, transitionTimeInSeconds)
    })

    return (
        <>
            <DreiPerspectiveCamera
                makeDefault
                ref={cameraRef}
                position={[0, props.startHeight, 0]}
                rotation={[-Math.PI/2, 0, 0]}
                fov={45} near={0.1} far={1000}
            />
            {/*<OrbitControls target={chunkPosition}/>*/}
        </>
    );
}