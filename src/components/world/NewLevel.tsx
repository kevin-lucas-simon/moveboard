import {NewChunk} from "./NewChunk";
import {OrbitControls} from "@react-three/drei";
import {useState} from "react";
import {useNewChunkRenderer} from "./hook/useNewChunkRenderer";
import React from "react";
import {NewLevelModel} from "../model/NewLevelModel";
import {ChunkCamera} from "../chunks/camera/ChunkCamera";
import {Player} from "../entities/Player";

export type NewLevelProps = NewLevelModel & {};

export function NewLevel(props: NewLevelProps) {
    const [activeChunk, setActiveChunk]
        = useState<string>(props.start);
    const renderedChunks
        = useNewChunkRenderer(props.chunks, activeChunk);

    if (!renderedChunks[activeChunk]) {
        return null;
    }

    return (
        <>
            <OrbitControls />

            {Object.keys(renderedChunks).filter(key => renderedChunks[key].visible).map(key => (
                <NewChunk key={key} {...renderedChunks[key].model}
                          active={key === activeChunk}
                          position={renderedChunks[key].renderPosition}
                          onChunkLeave={setActiveChunk}
                />
            ))}

            <ChunkCamera
                chunkPosition={renderedChunks[activeChunk].renderPosition}
                chunkDimension={renderedChunks[activeChunk].renderDimension.dimension}
                chunkMaxY={renderedChunks[activeChunk].renderDimension.maximalPosition.y}
                cameraFov={45}
                transitionSeconds={0.4}
                marginInBlockSize={1}
            />

            <Player position={renderedChunks[props.start].model.player} />
        </>
    );
}