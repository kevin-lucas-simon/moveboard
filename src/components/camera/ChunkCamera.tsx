import {useEffect, useRef, useState} from "react";
import {OrbitControls, PerspectiveCamera as DreiPerspectiveCamera} from "@react-three/drei";
import {PerspectiveCamera, Vector3} from "three";
import {useLevelContext} from "../chunks/Level";
import {useFrame} from "@react-three/fiber";

export type ChunkCameraProps = {
    startHeight: number,
    transitionFrames: number,
    fov: number,
}

export function ChunkCamera(props: ChunkCameraProps) {
    const cameraRef = useRef<PerspectiveCamera>(null)
    const orbitControlRef = useRef<any>(null)

    // calculate camera position and target
    const [targetCameraPosition, targetChunkPosition] = useChunkCameraTargetCalculation(props.fov, cameraRef.current?.aspect)

    // interpolate values to refs
    usePositionInterpolation(cameraRef.current?.position, targetCameraPosition, props.transitionFrames, props.startHeight)
    usePositionInterpolation(orbitControlRef.current?.target, targetChunkPosition, props.transitionFrames)

    return (
        <>
            <DreiPerspectiveCamera
                makeDefault
                ref={cameraRef}
                rotation={[-Math.PI/2, 0, 0]}
                fov={45} near={0.1} far={1000}
            />
            <OrbitControls ref={orbitControlRef}/>
        </>
    );
}

function useChunkCameraTargetCalculation(fov: number, aspect: number = 1.0) {
    // context values
    const activeChunk = useLevelContext()?.activeChunk ?? ""
    const chunkPosition = useLevelContext()?.renderedChunkPositions[activeChunk]
    const chunkDimensions = useLevelContext()?.chunkDimensions[activeChunk]

    // target values
    const [targetCameraPosition, setTargetCameraPosition]
        = useState<Vector3>(new Vector3(0, 0, 0))
    const [targetChunkPosition, setTargetChunkPosition]
        = useState<Vector3>(new Vector3(0, 0, 0))

    // calculation of target values if active chunk changes
    useEffect(() => {
        // check if context values are available
        if (!chunkPosition || !chunkDimensions) {
            return
        }

        // TODO in Funktion auslagern
        let chunk_length = chunkDimensions.dimension.x / 2
        if (aspect < chunkDimensions.dimension.x / chunkDimensions.dimension.z) {
            chunk_length =
                (chunkDimensions.dimension.z * chunkDimensions.dimension.x)
                / (chunkDimensions.dimension.z * aspect)
                / 2
        }

        // calculate camera distance via tangens
        const angle = fov / 2
        const distance = chunk_length / Math.tan(angle * Math.PI / 180)

        // define camera aimed position for animation
        setTargetCameraPosition(new Vector3(
            chunkPosition.x,
            chunkPosition.y + chunkDimensions.maximalPosition.y + distance,
            chunkPosition.z
        ))
        setTargetChunkPosition(chunkPosition)
    }, [fov, chunkPosition, chunkDimensions, aspect]) // TODO aspect klappt noch net

    return [targetCameraPosition, targetChunkPosition] as const
}

function usePositionInterpolation(
    refPositionToInterpolate: Vector3|undefined,
    targetPosition: Vector3,
    transitionTimeInFrames: number,
    startHeight: number = 0,
) {
    const [transitionTime, setTransitionTime] = useState<number>(0)
    const [lastPosition, setLastPosition] = useState<Vector3>(new Vector3(0, 0, 0))

    // start interpolation if target position changes
    useEffect(() => {
        setTransitionTime(transitionTimeInFrames)
        setLastPosition(refPositionToInterpolate ?? new Vector3(0, startHeight, 0))
    }, [targetPosition])

    // update transition if active
    useFrame(() => {
        if (transitionTime < 0 || !refPositionToInterpolate) {
            return
        }
        setTransitionTime(transitionTime - 1)
        refPositionToInterpolate.copy(
            lastPosition.clone().lerp(
                targetPosition,
                Math.pow(1 - transitionTime / transitionTimeInFrames, 3)
            )
        )
    });
}