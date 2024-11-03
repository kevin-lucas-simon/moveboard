import * as React from "react";
import {OrbitControls} from "@react-three/drei";
import {createContext, useContext, useEffect, useState} from "react";
import {useChunkRenderer} from "./hook/useChunkRenderer";
import {RenderedChunk} from "./model/RenderedChunk";

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

            {/* TODO yoo die Kamera soll einfach die Maße vom aktiven Chunk bekommen und danach sich ausrichten, fertig */}
            <OrbitControls />
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
