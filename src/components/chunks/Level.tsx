import * as React from "react";
import {createContext, useContext, useEffect, useState} from "react";
import {useChunkRenderer} from "./hook/useChunkRenderer";
import {RenderedChunk} from "./model/RenderedChunk";
import {ChunkCamera} from "./camera/ChunkCamera";
import {Player} from "../entities/Player";

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

    if (!renderedChunks[activeChunk]) {
        return null;
    }

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
                chunkPosition={renderedChunks[activeChunk].position}
                chunkDimension={renderedChunks[activeChunk].dimension.dimension}
                chunkMaxY={renderedChunks[activeChunk].dimension.maximalPosition.y}
                transitionSeconds={0.4}
                cameraFov={45}
                marginInBlockSize={1}
            />

            <Player position={renderedChunks[props.startChunk].component.props.player} />
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
