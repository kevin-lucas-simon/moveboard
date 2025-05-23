import {Chunk} from "./Chunk";
import {useState} from "react";
import {useChunkRenderer} from "./render/useChunkRenderer";
import React from "react";
import {LevelModel} from "../../model/LevelModel";
import {ChunkCamera} from "./camera/ChunkCamera";
import {Player} from "../entity/Player";

export type LevelProps = LevelModel & {};

export function Level(props: LevelProps) {
    const [activeChunk, setActiveChunk]
        = useState<string>(props.start);
    const renderedChunks
        = useChunkRenderer(props.chunks, props.start, activeChunk);

    if (!renderedChunks[activeChunk]) {
        throw new Error("Active chunk is not rendered");
    }

    return (
        <>
            {Object.keys(renderedChunks).map(key => (
                <Chunk key={key} {...renderedChunks[key].model}
                       active={key === activeChunk}
                       position={renderedChunks[key].worldPosition}
                       onChunkLeave={setActiveChunk}
                />
            ))}

            <ChunkCamera
                chunkPosition={renderedChunks[activeChunk].cameraDimension.centerWorldPosition}
                chunkDimension={renderedChunks[activeChunk].cameraDimension.dimension}
                chunkMaxY={renderedChunks[activeChunk].cameraDimension.maximalPosition.y}
                cameraFov={45}
                transitionSeconds={0.4}
                marginInBlockSize={1}
            />

            <Player position={props.chunks[props.start].player} />
        </>
    );
}