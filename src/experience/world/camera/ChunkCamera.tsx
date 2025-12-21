import React, {useCallback, useEffect, useRef, useState} from "react";
import {OrbitControls, PerspectiveCamera as DreiPerspectiveCamera, SoftShadows} from "@react-three/drei";
import {DirectionalLight, PerspectiveCamera, Vector3, Vector3Like} from "three";
import {useFrame} from "@react-three/fiber";
import {useSimulationSettings} from "../../debug/settings/SimulationSettingsProvider";

/**
 * Camera that follows the active chunk and is always positioned above it
 * @param props.chunkPosition active chunk position
 * @param props.chunkDimension active chunk dimension
 * @param props.cameraFov field of view of camera
 * @param props.transitionSeconds time in seconds for camera position transition when active chunk changes
 * @param props.marginInBlockSize margin in block size around the displayed active chunk
 * @constructor
 */
export function ChunkCamera(props: {
    chunkPosition: Vector3Like,
    chunkDimension: Vector3Like,
    cameraFov: number,
    transitionSeconds: number,
    marginInBlockSize: number,
}) {
    const cameraRef = useRef<PerspectiveCamera>(null)
    const orbitControlRef = useRef<any>(null)

    const lightRef = useRef<DirectionalLight>(null)

    const isMoveableCamera = useSimulationSettings()?.moveableCamera
    const isInterpolationProhibited = useSimulationSettings()?.isEditingMode

    const [targetCameraPosition, targetChunkPosition] = useChunkCameraTargetCalculation(
        props.chunkPosition,
        props.chunkDimension,
        props.cameraFov,
        cameraRef.current?.aspect,
        props.marginInBlockSize
    );

    useVectorInterpolation(cameraRef.current?.position, targetCameraPosition, props.transitionSeconds, isInterpolationProhibited)
    useVectorInterpolation(orbitControlRef.current?.target, targetChunkPosition, props.transitionSeconds, isInterpolationProhibited)

    const lightBox = Math.max(props.chunkDimension.x, props.chunkDimension.z) * 2;
    useEffect(() => {
        if (!lightRef.current) {
            return;
        }

        lightRef.current.position.x = targetCameraPosition.x + 2;
        lightRef.current.target.position.x = targetCameraPosition.x;

        lightRef.current.position.y = targetCameraPosition.y + 8;
        lightRef.current.target.position.y = targetCameraPosition.y;

        lightRef.current.position.z = targetCameraPosition.z + 3;
        lightRef.current.target.position.z = targetCameraPosition.z;

        lightRef.current.target.updateMatrixWorld();
    }, [targetCameraPosition]);

    return (
        <>
            <ambientLight intensity={Math.PI/2} />
            <SoftShadows />

            <directionalLight
                castShadow
                ref={lightRef}
                shadow-bias={-0.0001}
                shadow-mapSize={[2048, 2048]}
                intensity={1.5}
            >
                <orthographicCamera
                    attach="shadow-camera"
                    near={0.1}
                    far={100}
                    top={lightBox}
                    bottom={-lightBox}
                    left={-lightBox}
                    right={lightBox}
                />
            </directionalLight>
            <DreiPerspectiveCamera
                makeDefault
                ref={cameraRef}
                rotation={[-Math.PI/2, 0, 0]}
                fov={props.cameraFov}
            />
            {isMoveableCamera &&
                <OrbitControls
                    makeDefault
                    ref={orbitControlRef}
                />
            }
        </>
    );
}

/**
 * Calculate target camera position and target chunk position based on active chunk
 * @param chunkPosition
 * @param chunkDimension
 * @param cameraFov
 * @param cameraAspectRatio
 * @param marginInBlockSize
 */
function useChunkCameraTargetCalculation(
    chunkPosition: Vector3Like,
    chunkDimension: Vector3Like,
    cameraFov: number,
    cameraAspectRatio: number = 1.0,
    marginInBlockSize: number = 0.0,
) {
    // context values
    const [targetCameraPosition, setTargetCameraPosition]
        = useState<Vector3>(new Vector3(0, 0, 0))
    const [targetChunkPosition, setTargetChunkPosition]
        = useState<Vector3>(new Vector3(0, 0, 0))

    // calculation function that generate target values for active chunk
    const calculateTargetChunkPosition = useCallback(() => {
        // calculate chunk length based on aspect ratio
        const chunkLength = getAspectRatioBasedChunkLength(
            chunkDimension.x,
            chunkDimension.z,
            cameraAspectRatio,
            marginInBlockSize,
        )

        // calculate camera distance via tangens
        const cameraDistance = chunkLength / Math.tan(cameraFov/2 * Math.PI/180)

        // define camera aimed position for animation
        setTargetCameraPosition(new Vector3(
            chunkPosition.x,
            chunkPosition.y + cameraDistance,
            chunkPosition.z
        ))
        setTargetChunkPosition(new Vector3()
            .copy(chunkPosition)
        )
    }, [chunkPosition, chunkDimension, cameraAspectRatio, cameraFov, marginInBlockSize])

    // use two effects, one for prop and chunk change, the other one for window resize
    useEffect(
        calculateTargetChunkPosition
        , [calculateTargetChunkPosition, cameraFov, chunkPosition, chunkDimension, cameraAspectRatio, marginInBlockSize])
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
 * @param refVectorToInterpolate
 * @param targetVector
 * @param transitionSeconds
 * @param prohibitInterpolation
 */
function useVectorInterpolation(
    refVectorToInterpolate: Vector3|undefined,
    targetVector: Vector3,
    transitionSeconds: number,
    prohibitInterpolation: boolean = false,
) {
    const remainingTransitionTime = useRef<number>(0)
    const lastPosition = useRef<Vector3>(new Vector3(0, 0, 0))

    useEffect(() => {
        remainingTransitionTime.current = transitionSeconds
        lastPosition.current = refVectorToInterpolate ?? new Vector3(0, 0, 0)
    }, [refVectorToInterpolate, prohibitInterpolation, transitionSeconds, targetVector])

    useFrame((_, delta) => {
        if (remainingTransitionTime.current <= 0 || !refVectorToInterpolate) {
            return
        }

        if (prohibitInterpolation) {
            if (refVectorToInterpolate.equals(new Vector3(0, 0, 0))) {
                refVectorToInterpolate.copy(targetVector)
            }
            remainingTransitionTime.current = 0;
            return
        }

        const newTransitionTime = Math.max(remainingTransitionTime.current - delta, 0)
        refVectorToInterpolate.copy(
            lastPosition.current.clone().lerp(
                targetVector,
                Math.pow(1 - newTransitionTime / transitionSeconds, 3)
            )
        )
        remainingTransitionTime.current = newTransitionTime
    });
}