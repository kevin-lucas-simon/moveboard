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
        <div className="flex h-full">
            <div className="flex-none w-96 bg-gray-400 overflow-y-scroll">
                <h1>
                    <span className="text-3xl font-semibold">
                        {editChunk.name}
                    </span>
                    <span className="text-lg">
                        {level.name}
                    </span>
                </h1>

                <ChunkElementsEditor elements={editChunk.elements} onElementsChange={handleElementsChange} />
            </div>
            <div className="grow">
                <Environment>
                    {level &&
                        <Level {...level} start={chunkName} />
                    }
                </Environment>
            </div>
        </div>
    );
}
