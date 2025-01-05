import {Chunk} from "./Chunk";
import {useState} from "react";
import {useChunkRenderer} from "./hook/useChunkRenderer";
import React from "react";
import {LevelModel} from "./model/LevelModel";
import {ChunkCamera} from "./camera/ChunkCamera";
import {Player} from "../entity/Player";
import {Vector3Like} from "three";

export type LevelProps = LevelModel & {};

export function Level(props: LevelProps) {
    const [activeChunk, setActiveChunk]
        = useState<string>(props.start);
    const renderedChunks
        = useChunkRenderer(props.chunks, props.start, activeChunk);
    const [playerPosition] =
        useState<Vector3Like>(renderedChunks[activeChunk].model.player);

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
                chunkPosition={renderedChunks[activeChunk].worldPosition}
                chunkDimension={renderedChunks[activeChunk].cameraDimension.dimension}
                chunkMaxY={renderedChunks[activeChunk].cameraDimension.maximalPosition.y}
                cameraFov={45}
                transitionSeconds={0.4}
                marginInBlockSize={1}
            />

            <Player position={playerPosition} />
        </>
    );
}