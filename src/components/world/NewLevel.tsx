import {NewChunk} from "./NewChunk";
import {OrbitControls} from "@react-three/drei";
import {useState} from "react";
import {useNewChunkRenderer} from "./hook/useNewChunkRenderer";
import React from "react";
import {NewLevelModel} from "../model/NewLevelModel";
import {ChunkCamera} from "../chunks/camera/ChunkCamera";

export type NewLevelProps = NewLevelModel & {};

export function NewLevel(props: NewLevelProps) {
    const [activeChunk, setActiveChunk]
        = useState<string>(props.start);
    const renderedChunks
        = useNewChunkRenderer(props.chunks, activeChunk);

    return (
        <>
            <OrbitControls />

            {Object.keys(renderedChunks).filter(key => renderedChunks[key].visible).map(key => (
                <NewChunk key={key} {...renderedChunks[key].model}
                    position={renderedChunks[key].renderPosition}
                />
            ))}

            <ChunkCamera
                chunkPosition={renderedChunks[activeChunk]?.renderPosition ?? {x: 0, y: 0, z: 0}}
                chunkDimension={renderedChunks[activeChunk]?.renderDimension?.dimension ?? {x: 0, y: 0, z: 0}}
                chunkMaxY={renderedChunks[activeChunk]?.renderDimension?.maximalPosition?.y ?? 0}
                cameraFov={45}
                transitionSeconds={0.4}
                marginInBlockSize={1}
            />
        </>
    );
}