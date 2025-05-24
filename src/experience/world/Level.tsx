import {Chunk} from "./Chunk";
import {useState} from "react";
import {useChunkRenderer} from "./render/useChunkRenderer";
import React from "react";
import {LevelModel} from "../../model/LevelModel";
import {ChunkCamera} from "./camera/ChunkCamera";
import {Player} from "../entity/Player";
import {Vector3, Vector3Like} from "three";

export type LevelProps = LevelModel & {};

export function Level(props: LevelProps) {
    const [activeChunk, setActiveChunk]
        = useState<string>(props.start);
    const renderedChunks
        = useChunkRenderer(props.chunks, activeChunk);
    const [playerSpawnPosition, setPlayerSpawnPosition] = useState<Vector3Like>(renderedChunks[activeChunk].playerSpawnPosition ?? new Vector3());

    if (!renderedChunks[activeChunk]) {
        throw new Error("Active chunk is not rendered");
    }

    function onPlayerOutOfBounds() {
        console.log("Player out of bounds, respawning in chunk", activeChunk);
        setPlayerSpawnPosition(new Vector3().copy(renderedChunks[activeChunk].playerSpawnPosition));
    }

    return (
        <>
            {Object.keys(renderedChunks).map(key => (
                <Chunk key={key} {...renderedChunks[key]}
                       active={key === activeChunk}
                       onPlayerChunkLeave={setActiveChunk}
                       onPlayerOutOfBounds={onPlayerOutOfBounds}
                />
            ))}

            <ChunkCamera
                chunkPosition={renderedChunks[activeChunk].cameraDimension.centerPosition}
                chunkDimension={renderedChunks[activeChunk].cameraDimension.size}
                chunkMaxY={renderedChunks[activeChunk].cameraDimension.maximalPosition.y}
                cameraFov={45}
                transitionSeconds={0.4}
                marginInBlockSize={1}
            />

            <Player spawnPosition={playerSpawnPosition}/>
        </>
    );
}