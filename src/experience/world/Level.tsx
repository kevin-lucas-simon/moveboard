import {Chunk} from "./Chunk";
import {useRef, useState} from "react";
import {useChunkRenderer} from "./render/useChunkRenderer";
import React from "react";
import {LevelModel} from "../../model/LevelModel";
import {ChunkCamera} from "./camera/ChunkCamera";
import {Player} from "../entity/Player";
import {RapierRigidBody} from "@react-three/rapier";

export type LevelProps = LevelModel & {};

export function Level(props: LevelProps) {
    const [activeChunk, setActiveChunk]
        = useState<string>(props.start);
    const renderedChunks
        = useChunkRenderer(props.chunks, activeChunk);
    const playerRef = useRef<RapierRigidBody>(null)

    if (!renderedChunks[activeChunk]) {
        throw new Error("Active chunk is not rendered");
    }

    // change active chunk when player leaves a chunk
    function onPlayerChunkLeave(neighbour: string) {
        if (props.chunks[neighbour]) {
            setActiveChunk(neighbour);
        }
    }

    // reset player position if it goes out of bounds
    function onPlayerOutOfBounds() {
        if (playerRef.current) {
            console.log("Player out of bounds, respawning in chunk", activeChunk);
            playerRef.current.setTranslation(renderedChunks[activeChunk].playerSpawnPosition, true)
            playerRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
            playerRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
        }
    }

    return (
        <>
            {Object.keys(renderedChunks).map(key => (
                <Chunk key={key} {...renderedChunks[key]}
                       active={key === activeChunk}
                       onPlayerChunkLeave={onPlayerChunkLeave}
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

            <Player playerRef={playerRef} spawnPosition={renderedChunks[props.start]?.playerSpawnPosition ?? renderedChunks[activeChunk].playerSpawnPosition}/>
        </>
    );
}