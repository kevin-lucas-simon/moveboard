import {useEffect, useRef, useState} from "react";
import {OrbitControls, PerspectiveCamera as DreiPerspectiveCamera} from "@react-three/drei";
import {PerspectiveCamera, Vector3} from "three";
import {useLevelContext} from "../chunks/Level";
import {useFrame} from "@react-three/fiber";

export type ChunkCameraProps = {
    startHeight: number,
    transitionSeconds: number,
    fov: number,
    margin: number,
}

export function ChunkCamera(props: ChunkCameraProps) {
    const cameraRef = useRef<PerspectiveCamera>(null)
    const orbitControlRef = useRef<any>(null)

    // calculate camera position and target
    const [targetCameraPosition, targetChunkPosition] =
        useChunkCameraTargetCalculation(props.fov, cameraRef.current?.aspect, props.margin)

    // interpolate values to refs
    usePositionInterpolation(cameraRef.current?.position, targetCameraPosition, props.transitionSeconds, props.startHeight)
    usePositionInterpolation(orbitControlRef.current?.target, targetChunkPosition, props.transitionSeconds)

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

function useChunkCameraTargetCalculation(fov: number, aspect: number = 1.0, margin: number = 0.0) {
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

        // calculate chunk length based on aspect ratio
        const chunkLength = getAspectRatioBasedChunkLength(
            chunkDimensions.dimension.x,
            chunkDimensions.dimension.z,
            aspect,
            margin,
        )

        // calculate camera distance via tangens
        const cameraDistance = chunkLength / Math.tan(fov/2 * Math.PI/180)

        // define camera aimed position for animation
        setTargetCameraPosition(new Vector3(
            chunkPosition.x,
            chunkPosition.y + chunkDimensions.maximalPosition.y + cameraDistance,
            chunkPosition.z
        ))
        setTargetChunkPosition(chunkPosition)
    }, [fov, chunkPosition, chunkDimensions, aspect, margin])

    return [targetCameraPosition, targetChunkPosition] as const
}

function getAspectRatioBasedChunkLength(chunkX: number, chunkZ: number, aspect: number, margin: number) {
    // apply margin to chunk dimensions
    const x = chunkX + margin
    const z = chunkZ + margin

    // compare aspect ratio with chunk dimension ratio
    if (aspect < x / z) {
        // z camera (based on x default)
        return (z * x) / (z * aspect) / 2
    }

    // x camera (default)
    return x / 2
}

function usePositionInterpolation(
    refPositionToInterpolate: Vector3|undefined,
    targetPosition: Vector3,
    transitionSeconds: number,
    startHeight: number = 0,
) {
    const [transitionTime, setTransitionTime] = useState<number>(0)
    const [lastPosition, setLastPosition] = useState<Vector3>(new Vector3(0, 0, 0))

    // start interpolation if target position changes
    useEffect(() => {
        setTransitionTime(transitionSeconds)
        setLastPosition(refPositionToInterpolate ?? new Vector3(0, startHeight, 0))
    }, [targetPosition])

    // update transition if active
    useFrame((state, delta) => {
        if (transitionTime <= 0 || !refPositionToInterpolate) {
            return
        }
        setTransitionTime(Math.max(transitionTime - delta, 0))
        refPositionToInterpolate.copy(
            lastPosition.clone().lerp(
                targetPosition,
                Math.pow(1 - transitionTime / transitionSeconds, 3)
            )
        )
    });
}