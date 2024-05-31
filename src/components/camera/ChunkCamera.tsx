import {useEffect, useRef, useState} from "react";
import {OrbitControls, PerspectiveCamera as DreiPerspectiveCamera} from "@react-three/drei";
import {PerspectiveCamera, Vector3} from "three";
import {useLevelContext} from "../chunks/Level";
import {useFrame} from "@react-three/fiber";

export type ChunkCameraProps = {
    transitionSeconds: number,
    cameraFov: number,
    marginInBlockSize: number,
}

export function ChunkCamera(props: ChunkCameraProps) {
    const cameraRef = useRef<PerspectiveCamera>(null)
    const orbitControlRef = useRef<any>(null)

    // calculate camera position and target
    const [targetCameraPosition, targetChunkPosition] =
        useChunkCameraTargetCalculation(props.cameraFov, cameraRef.current?.aspect, props.marginInBlockSize)

    // interpolate position values to refs
    usePositionInterpolation(cameraRef.current?.position, targetCameraPosition, props.transitionSeconds)
    usePositionInterpolation(orbitControlRef.current?.target, targetChunkPosition, props.transitionSeconds)

    return (
        <>
            <DreiPerspectiveCamera
                makeDefault
                ref={cameraRef}
                rotation={[-Math.PI/2, 0, 0]}
                fov={props.cameraFov}
            />
            <OrbitControls ref={orbitControlRef}/>
        </>
    );
}

/**
 * Calculate target camera position and target chunk position based on active chunk
 * @param cameraFov
 * @param cameraAspectRatio
 * @param marginInBlockSize
 */
function useChunkCameraTargetCalculation(
    cameraFov: number,
    cameraAspectRatio: number = 1.0,
    marginInBlockSize: number = 0.0,
) {
    // context values
    const activeChunk = useLevelContext()?.activeChunk ?? ""
    const chunkPosition = useLevelContext()?.renderedChunkPositions[activeChunk]
    const chunkDimensions = useLevelContext()?.chunkDimensions[activeChunk]

    // target values
    const [targetCameraPosition, setTargetCameraPosition]
        = useState<Vector3>(new Vector3(0, 0, 0))
    const [targetChunkPosition, setTargetChunkPosition]
        = useState<Vector3>(new Vector3(0, 0, 0))

    // calculation function that generate target values for active chunk
    const calculateTargetChunkPosition = () => {
        // check if context values are available
        if (!chunkPosition || !chunkDimensions) {
            return
        }

        // calculate chunk length based on aspect ratio
        const chunkLength = getAspectRatioBasedChunkLength(
            chunkDimensions.dimension.x,
            chunkDimensions.dimension.z,
            cameraAspectRatio,
            marginInBlockSize,
        )

        // calculate camera distance via tangens
        const cameraDistance = chunkLength / Math.tan(cameraFov/2 * Math.PI/180)

        // define camera aimed position for animation
        setTargetCameraPosition(new Vector3(
            chunkPosition.x,
            chunkPosition.y + chunkDimensions.maximalPosition.y + cameraDistance,
            chunkPosition.z
        ))
        setTargetChunkPosition(chunkPosition)
    }

    // use two effects, one for prop and chunk change, the other one for window resize
    useEffect(calculateTargetChunkPosition, [cameraFov, chunkPosition, chunkDimensions, cameraAspectRatio, marginInBlockSize])
    useEffect(() => {
        window.addEventListener('resize', calculateTargetChunkPosition);
        return () => {
            window.removeEventListener('resize', calculateTargetChunkPosition);
        };
    }, [calculateTargetChunkPosition]);

    return [targetCameraPosition, targetChunkPosition] as const
}

/**
 * Calculate chunk length based on viewport aspect ratio in relation to chunk ratio to fit in camera view
 * @param chunkDimensionX
 * @param chunkDimensionZ
 * @param cameraAspectRatio
 * @param marginInBlockSize
 */
function getAspectRatioBasedChunkLength(
    chunkDimensionX: number,
    chunkDimensionZ: number,
    cameraAspectRatio: number,
    marginInBlockSize: number,
) {
    // apply margin to chunk dimensions
    const x = chunkDimensionX + marginInBlockSize
    const z = chunkDimensionZ + marginInBlockSize

    // compare aspect ratio with chunk dimension ratio
    if (cameraAspectRatio < x / z) {
        // z camera (based on x default)
        return (z * x) / (z * cameraAspectRatio) / 2
    }

    // x camera (default)
    return x / 2
}

/**
 * Interpolate position between two vectors
 * @param refPositionToInterpolate
 * @param targetPosition
 * @param transitionSeconds
 */
function usePositionInterpolation(
    refPositionToInterpolate: Vector3|undefined,
    targetPosition: Vector3,
    transitionSeconds: number,
) {
    const [transitionTime, setTransitionTime] = useState<number>(0)
    const [lastPosition, setLastPosition] = useState<Vector3>(new Vector3(0, 0, 0))

    // start interpolation if target position changes
    useEffect(() => {
        setTransitionTime(transitionSeconds)
        setLastPosition(refPositionToInterpolate ?? new Vector3(0, 0, 0))
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