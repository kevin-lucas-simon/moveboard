import {NewChunk} from "./NewChunk";
import {OrbitControls} from "@react-three/drei";
import {useState} from "react";
import {useRecursiveChunkDownloader} from "./hook/useRecursiveChunkDownloader";
import {useNewChunkRenderer} from "./hook/useNewChunkRenderer";
import React from "react";

export type NewLevelProps = {
    startChunk: string,
}

export function NewLevel(props: NewLevelProps) {
    const [activeChunkId, setActiveChunkId]
        = useState<string>(props.startChunk);

    const downloadedChunks = useRecursiveChunkDownloader(props.startChunk);
    const renderedChunks = useNewChunkRenderer(downloadedChunks, activeChunkId);

    return (
        <>
            <OrbitControls />

            {Object.keys(renderedChunks).filter(key => renderedChunks[key].visible).map(key => (
                <NewChunk key={key} {...renderedChunks[key].model}
                    position={renderedChunks[key].renderPosition}
                />
            ))}
        </>
    );
}