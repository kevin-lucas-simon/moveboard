import * as React from "react";
import {createContext, useContext, useEffect, useState} from "react";
import {useChunkRenderer} from "./hook/useChunkRenderer";
import {RenderedChunk} from "./model/RenderedChunk";
import {ChunkCamera} from "./camera/ChunkCamera";

const LevelContext = createContext<LevelContextType|undefined>(undefined);
export type LevelContextType = {
    function: {
        setActiveChunk: (chunkName: string) => void,
    },
    renderedChunks: {[key: string]: RenderedChunk},
    activeChunk: string,
}

export type LevelProps = {
    startChunk: string,
}

export function Level(props: LevelProps) {
    const [activeChunk, setActiveChunk]
        = useState<string>(props.startChunk);
    const renderedChunks= useChunkRenderer(activeChunk);

    useEffect(() => {
        setActiveChunk(props.startChunk);
    }, [props.startChunk]);

    return (
        <>
            <LevelContext.Provider value={{
                function: {
                    setActiveChunk: setActiveChunk,
                },
                renderedChunks,
                activeChunk,
            }}>
                {Object.keys(renderedChunks).map((key) => (
                    <React.Fragment key={key}>
                        {renderedChunks[key].component}
                    </React.Fragment>
                ))}
            </LevelContext.Provider>

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

export function useLevelContext(): LevelContextType {
    const levelContext = useContext(LevelContext);
    if (!levelContext) {
        throw new Error("Level context not found. Are you using the Level component?");
    }
    return levelContext;
}
