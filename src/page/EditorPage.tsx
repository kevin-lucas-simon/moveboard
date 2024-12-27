import {Level} from "../experience/world/Level";
import {Environment} from "../experience/Environment";
import {useLevelDownloader} from "../experience/world/hook/useLevelDownloader";
import {useEffect, useState} from "react";
import React from "react";
import {ChunkElementsEditor} from "../component/editor/ChunkElementsEditor";
import {ElementModel} from "../experience/world/model/ElementModel";
import {LevelModel} from "../experience/world/model/LevelModel";
import {TabButton} from "../component/editor/TabButton";
import {
    AtSymbolIcon,
    PlayIcon,
    PuzzlePieceIcon,
    Square2StackIcon
} from "@heroicons/react/24/outline";
import {ChunkJointsEditor} from "../component/editor/ChunkJointsEditor";
import {JointModel} from "../experience/world/model/JointModel";
import {ChunkGeneralEditor} from "../component/editor/ChunkGeneralEditor";
import {ChunkModel} from "../experience/world/model/ChunkModel";

enum EditorTab {
    GENERAL= "general",
    JOINTS = "joints",
    ELEMENTS = "elements",
    TEST = "test",
}

export function EditorPage() {
    const levelName = "TestLevel";
    const chunkName = "FirstChunk";

    const downloadedLevel = useLevelDownloader(levelName);

    const [level, setLevel] = useState<LevelModel|undefined>(undefined)
    const editChunk = level?.chunks[chunkName];

    const [tab, setTab] = useState<EditorTab>(EditorTab.GENERAL);
    const [isTabOpen, setIsOpenTab] = useState(true);

    useEffect(() => {
        setLevel(downloadedLevel);
    }, [downloadedLevel]);

    if (!level || !editChunk) {
        return <></>;
    }

    const handleGeneralChange = (chunk: ChunkModel) => {
        setLevel({
            ...level,
            chunks: {
                ...level.chunks,
                [chunkName]: chunk,
            }
        })
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

    const handleJointsChange = (joints: JointModel[]) => {
        setLevel({
            ...level,
            chunks: {
                ...level.chunks,
                [chunkName]: {
                    ...editChunk,
                    joints: joints,
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
                {/* tab buttons */}
                <div className="w-8 shrink-0 flex flex-col gap-2">
                    <TabButton active={tab === EditorTab.GENERAL} onClick={() => setTab(EditorTab.GENERAL)}>
                        <AtSymbolIcon />
                    </TabButton>
                    <TabButton active={tab === EditorTab.JOINTS} onClick={() => setTab(EditorTab.JOINTS)}>
                        <PuzzlePieceIcon />
                    </TabButton>
                    <TabButton active={tab === EditorTab.ELEMENTS} onClick={() => setTab(EditorTab.ELEMENTS)}>
                        <Square2StackIcon />
                    </TabButton>
                    <div className="grow"></div>
                    <TabButton active={tab === EditorTab.TEST} onClick={() => setTab(EditorTab.TEST)}>
                        <PlayIcon />
                    </TabButton>
                </div>

                {/* tab content */}
                {isTabOpen &&
                    <div className="w-72 shrink-0 rounded-xl bg-gray-500/10 overflow-hidden">
                        {tab === EditorTab.GENERAL &&
                            <ChunkGeneralEditor chunk={editChunk} onChunkChange={handleGeneralChange}/>
                        }
                        {tab === EditorTab.JOINTS &&
                            <ChunkJointsEditor joints={editChunk.joints} onJointsChange={handleJointsChange}/>
                        }
                        {tab === EditorTab.ELEMENTS &&
                            <ChunkElementsEditor elements={editChunk.elements} onElementsChange={handleElementsChange}/>
                        }
                        {tab === EditorTab.TEST &&
                            <div>Test Debug Values</div>
                        }
                    </div>
                }

                {/* 3d canvas */}
                <Environment className="rounded-xl bg-gray-500/10">
                    {level &&
                        <Level {...level} start={chunkName}/>
                    }
                </Environment>
            </div>
        </div>
    );
}
