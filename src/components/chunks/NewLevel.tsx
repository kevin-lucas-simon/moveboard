import {BasicBlock} from "../blocks/BasicBlock";
import * as React from "react";
import {OrbitControls} from "@react-three/drei";
import {createContext, useEffect, useState} from "react";
import {useChunkRenderer} from "./hook/useChunkRenderer";
import {RenderedChunk} from "./model/RenderedChunk";
export const NewLevelContext = createContext<{[key: string]: RenderedChunk}>({});

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
            <NewLevelContext.Provider value={renderedChunks}>
                {/* TODO key in Objekte integrieren! */}
                {Object.keys(renderedChunks).map((key) => renderedChunks[key].component)}
            </NewLevelContext.Provider>

            {/* TODO yoo die Kamera soll einfach die Maße vom aktiven Chunk bekommen und danach sich ausrichten, fertig */}
            <OrbitControls />
            <BasicBlock position={{x:0,y:0,z:0}} dimension={{x:0.5,y:1.5,z:0.5}} color={"pink"} />
        </>
    );
}
