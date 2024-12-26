import {Level} from "../experience/world/Level";
import {Environment} from "../experience/Environment";
import {useLevelDownloader} from "../experience/world/hook/useLevelDownloader";
import {useEffect, useState} from "react";
import React from "react";
import {ChunkElementsEditor} from "../component/editor/ChunkElementsEditor";
import {ElementModel} from "../experience/world/model/ElementModel";
import {LevelModel} from "../experience/world/model/LevelModel";

export function EditorPage() {
    const levelName = "TestLevel";
    const chunkName = "FirstChunk";

    const downloadedLevel = useLevelDownloader(levelName);

    const [level, setLevel] = useState<LevelModel|undefined>(undefined)
    const editChunk = level?.chunks[chunkName];

    useEffect(() => {
        setLevel(downloadedLevel);
    }, [downloadedLevel]);

    if (!level || !editChunk) {
        return <></>;
    }

    const handleElementsChange = (elements: ElementModel[]) => {
        setLevel({
            ...level,
            chunks: {
                ...level.chunks,
                [chunkName]: {
                    ...editChunk,
                    elements: elements,
                }
            }
        })
    }

    return (
        <div className="w-full h-full flex flex-col gap-4 p-4">
            {/* header */}
            <div className="flex gap-4 h-8 items-center">
                {/* logo */}
                <div className="w-8 h-8 bg-black flex rounded rounded-tl-2xl">
                    <div className="w-2 h-2 mt-2 ml-4 rounded bg-white"></div>
                </div>
                {/* chunk name */}
                <h1 className="text-2xl">{editChunk.name}</h1>
                {/* chunk search */}
                <div className="grow"></div>
                {/* level selector */}
                <div className="">{level.name}</div>
            </div>

            {/* body */}
            <div className="grow flex gap-4">
                {/* menu bar */}
                <div className="w-8 shrink-0 flex flex-col gap-2">
                    <button className="w-8 h-8 rounded hover:outline outline-gray-500/20">G</button>
                    <button className="w-8 h-8 rounded hover:outline outline-gray-500/20">J</button>
                    <button className="w-8 h-8 rounded font-bold bg-gray-500/20 hover:outline outline-gray-500/20">E</button>

                    <div className="grow"></div>

                    <button className="w-8 h-8 rounded hover:outline outline-gray-500/20">P</button>
                </div>

                {/* properties */}
                <div className="max-w-xs basis-1/3 h-full p-4 rounded-xl bg-gray-500/10 overflow-hidden">
                    <ChunkElementsEditor elements={editChunk.elements} onElementsChange={handleElementsChange} />
                </div>

                {/* 3d editor */}
                <Environment className="grow rounded-xl bg-gray-500/10">
                    {level &&
                        <Level {...level} start={chunkName} />
                    }
                </Environment>
            </div>
        </div>
    );
}
