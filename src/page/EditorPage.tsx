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
    AtSymbolIcon, Bars2Icon, MagnifyingGlassIcon,
    PlayIcon,
    PuzzlePieceIcon,
    Square2StackIcon
} from "@heroicons/react/24/outline";
import {ChunkJointsEditor} from "../component/editor/ChunkJointsEditor";
import {JointModel} from "../experience/world/model/JointModel";
import {ChunkGeneralEditor} from "../component/editor/ChunkGeneralEditor";
import {ChunkModel} from "../experience/world/model/ChunkModel";
import {ChunkTestEditor} from "../component/editor/ChunkTestEditor";
import {EditorMenu} from "../component/editor/header/EditorMenu";
import {EditorDropdownItem} from "../component/editor/header/EditorMenuButton";
import {EditorDropdownDivider} from "../component/editor/header/EditorDropdownDivider";

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
    // TODO ich bin hier ein wenig unzufrieden, wie auf den Chunk über das Level Objekt zugegriffen wird, bitte auslagern!
    // TODO der Aufruf sollte über die URL erfolgen, nach dem Motto `editor/TestLevel/FirstChunk` oder so

    const [tab, setTab] = useState<EditorTab>(EditorTab.GENERAL);

    useEffect(() => {
        setLevel(downloadedLevel);
    }, [downloadedLevel]);

    if (!level || !editChunk) {
        return <></>;
    }

    // TODO useReducer muss hier rein!
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
                {/* editing name */}
                <div className="flex flex-col gap-0.5">
                    <h1 className="text-2xl leading-none">{editChunk.name}</h1>
                    <div className="text-xs leading-none">{level.name}</div>
                </div>

                {/* chunk search */}
                {/* TODO über die Chunk Suche soll man zwischen den Chunks wechseln können */}
                <div className="grow">
                    <label className="max-w-sm mx-auto flex items-center gap-2 py-1 px-2 bg-gray-500/10 rounded-md">
                        <MagnifyingGlassIcon className="h-4"/>
                        <input type="text" className="w-full bg-transparent focus:outline-none"
                               placeholder="Search chunk..."
                        />
                    </label>
                </div>

                {/* menu selector */}
                <EditorMenu>
                    <div>
                        <EditorDropdownItem>Export Level</EditorDropdownItem> {/* TODO Export level data as modal */}
                        <EditorDropdownItem>Clear Changes</EditorDropdownItem> {/* TODO Clear level or chunk changes as Modal */}
                    </div>
                    <EditorDropdownDivider/>
                    <div>
                        <EditorDropdownItem href={"/"}>Leave Editor</EditorDropdownItem>
                    </div>
                </EditorMenu>
            </div>

            {/* body */}
            <div className="grow flex gap-4">
                {/* tab buttons */}
                <div className="w-8 shrink-0 flex flex-col gap-2">
                    <TabButton active={tab === EditorTab.GENERAL} onClick={() => setTab(EditorTab.GENERAL)}>
                        <AtSymbolIcon/>
                    </TabButton>
                    <TabButton active={tab === EditorTab.JOINTS} onClick={() => setTab(EditorTab.JOINTS)}>
                        <PuzzlePieceIcon/>
                    </TabButton>
                    <TabButton active={tab === EditorTab.ELEMENTS} onClick={() => setTab(EditorTab.ELEMENTS)}>
                        <Square2StackIcon/>
                    </TabButton>
                    <div className="grow"></div>
                    <TabButton active={tab === EditorTab.TEST} onClick={() => setTab(EditorTab.TEST)}>
                        <PlayIcon/>
                    </TabButton>
                </div>

                {/* tab content */}
                <div className="w-72 shrink-0 rounded-xl bg-gray-500/10 overflow-hidden">
                    {/* TODO an sich sollte ich generell schauen, ob ich Duplikate sinnvoll im Refactoring zusammenführen kann*/}
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
                        <ChunkTestEditor/>
                    }
                </div>

                {/* 3d canvas */}
                {/* TODO der normale Editor sollte keinen UserInput als auch keine Physik erlauben (nur Testmodus)*/}
                <Environment className="rounded-xl bg-gray-500/10">
                    {level &&
                        <Level {...level} start={chunkName}/>
                    }
                </Environment>
            </div>
        </div>
    );
}
