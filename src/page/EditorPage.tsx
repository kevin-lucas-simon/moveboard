import {Level} from "../experience/world/Level";
import {Environment} from "../experience/Environment";
import {useLevelDownloader} from "../experience/world/hook/useLevelDownloader";
import {useEffect, useState} from "react";
import React from "react";
import {ChunkModel} from "../experience/world/model/ChunkModel";
import {ChunkElementsEditor} from "../component/editor/ChunkElementsEditor";
import {ElementModel} from "../experience/world/model/ElementModel";

export function EditorPage() {
    const levelName = "TestLevel";
    const chunkName = "FirstChunk";

    const editLevel = useLevelDownloader(levelName);
    const [editChunk, setEditChunk] = useState<ChunkModel|undefined>(undefined);

    useEffect(() => {
        setEditChunk(editLevel?.chunks[chunkName]);
    }, [editLevel]);

    if (!editLevel || !editChunk) {
        return <></>;
    }

    // TODO an sich können wir das Handling von Joints, Elements und Chunk allgemein in eigene Editor Komponenten auslagern

    const handleElementsChange = (elements: ElementModel[]) => {
        setEditChunk({
            ...editChunk,
            elements: elements,
        });
    }

    return (
        <div className="flex h-full">
            <div className="flex-none w-96 bg-gray-400 overflow-y-scroll">
                <h1>
                    <span className="text-3xl font-semibold">
                        {editChunk.name}
                    </span>
                    <span className="text-lg">
                        {editLevel.name}
                    </span>
                </h1>

                <ChunkElementsEditor elements={editChunk.elements} onElementsChange={handleElementsChange} />
            </div>
            <div className="grow">
                <Environment>
                    {editLevel &&
                        <Level {...editLevel} start={chunkName} />
                    }
                </Environment>
            </div>
        </div>
    );
}
