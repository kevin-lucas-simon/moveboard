import React, {useEffect, useRef} from "react";
import {DirectionalLight, Vector3Like} from "three";
import {SoftShadows} from "@react-three/drei";

export function ChunkLighting(props: {
    chunkDimension: Vector3Like,
    chunkCameraPosition: Vector3Like,
}) {
    const lightRef = useRef<DirectionalLight>(null)

    const lightBox = Math.max(props.chunkDimension.x, props.chunkDimension.z) * 2;

    useEffect(() => {
        if (!lightRef.current) {
            return;
        }

        lightRef.current.position.x = props.chunkCameraPosition.x + 2;
        lightRef.current.target.position.x = props.chunkCameraPosition.x;

        lightRef.current.position.y = props.chunkCameraPosition.y + 8;
        lightRef.current.target.position.y = props.chunkCameraPosition.y;

        lightRef.current.position.z = props.chunkCameraPosition.z + 2;
        lightRef.current.target.position.z = props.chunkCameraPosition.z;

        lightRef.current.target.updateMatrixWorld();
    }, [props.chunkCameraPosition]);

    return (
        <>
            <SoftShadows />
            <ambientLight intensity={Math.PI/2} />

            <directionalLight
                castShadow
                ref={lightRef}
                shadow-bias={-0.0001}
                shadow-mapSize={[2048, 2048]}
                intensity={1.5}
            >
                <orthographicCamera
                    attach="shadow-camera"
                    near={0.01}
                    far={100}
                    top={lightBox}
                    bottom={-lightBox}
                    left={-lightBox}
                    right={lightBox}
                />
            </directionalLight>
        </>
    );
}
