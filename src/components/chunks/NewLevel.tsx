import * as React from "react";
import {createContext, useContext, useEffect, useState} from "react";
import {useChunkRenderer} from "./hook/useChunkRenderer";
import {RenderedChunk} from "./model/RenderedChunk";
import {ChunkCamera} from "./camera/ChunkCamera";

const NewLevelContext = createContext<NewLevelContextType|undefined>(undefined);
export type NewLevelContextType = {
    function: {
        setActiveChunk: (chunkName: string) => void,
    },
    renderedChunks: {[key: string]: RenderedChunk},
    activeChunk: string,
}

export type NewLevelProps = {
    startChunk: string,
}

export function NewLevel(props: NewLevelProps) {
    const [activeChunk, setActiveChunk]
        = useState<string>(props.startChunk);
    const renderedChunks= useChunkRenderer(activeChunk);

    useEffect(() => {
        setActiveChunk(props.startChunk);
    }, [props.startChunk]);

    return (
        <>
            <NewLevelContext.Provider value={{
                function: {
                    setActiveChunk: setActiveChunk,
                },
                renderedChunks,
                activeChunk,
            }}>
                {/* TODO key in Objekte integrieren! */}
                {Object.keys(renderedChunks).map((key) => renderedChunks[key].component)}
            </NewLevelContext.Provider>

            <ChunkCamera
                chunkPosition={renderedChunks[activeChunk]?.position ?? {x: 0, y: 0, z: 0}}
                chunkDimension={renderedChunks[activeChunk]?.dimension.dimension ?? {x: 0, y: 0, z: 0}}
                chunkMaxY={renderedChunks[activeChunk]?.dimension.maximalPosition.y ?? 0}
                transitionSeconds={0.4}
                cameraFov={45}
                marginInBlockSize={1}
            />
        </>
    );
}

export function useNewLevelContext(): NewLevelContextType {
    const levelContext = useContext(NewLevelContext);
    if (!levelContext) {
        throw new Error("Level context not found. Are you using the Level component?");
    }
    return levelContext;
}
