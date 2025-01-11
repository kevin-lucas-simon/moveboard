import {Level} from "../experience/world/Level";
import {Environment} from "../experience/Environment";
import {useState} from "react";
import React from "react";
import {EditorElementsTab} from "./tabs/EditorElementsTab";
import {ElementModel} from "../experience/world/model/ElementModel";
import {TabButton} from "./tabs/TabButton";
import {
    AtSymbolIcon, Bars3Icon,
    PlayIcon,
    PuzzlePieceIcon,
    Square2StackIcon
} from "@heroicons/react/24/outline";
import {EditorJointsTab} from "./tabs/EditorJointsTab";
import {JointModel} from "../experience/world/model/JointModel";
import {EditorGeneralTab} from "./tabs/EditorGeneralTab";
import {ChunkModel} from "../experience/world/model/ChunkModel";
import {EditorTestTab} from "./tabs/EditorTestTab";
import {BasicDropdown} from "../component/dropdown/BasicDropdown";
import {BasicDropdownItem} from "../component/dropdown/BasicDropdownItem";
import {BasicDropdownDivider} from "../component/dropdown/BasicDropdownDivider";
import {BasicDialog} from "../component/dialog/BasicDialog";
import {LevelModel} from "../experience/world/model/LevelModel";
import {Textarea} from "@headlessui/react";
import {SearchBar} from "../component/dropdown/SearchBar";

enum EditorTabs {
    GENERAL= "general",
    JOINTS = "joints",
    ELEMENTS = "elements",
    TEST = "test",
}

enum EditorDialogs {
    LEVEL_EXPORT = "level_export",
    LEVEL_CHANGES_CLEAR = "level_changes_clear",
}

export type LevelEditorProps = {
    downloadedLevel: LevelModel
}
export function LevelEditor(props: LevelEditorProps) {
    const [level, setLevel] = useState<LevelModel>(props.downloadedLevel);
    const [chunkName, setChunkName] = useState<string>(level.start);
    const editChunk = level.chunks[chunkName];

    const [tab, setTab] = useState<EditorTabs>(EditorTabs.GENERAL);
    const [dialog, setDialog] = useState<EditorDialogs|null>(null);

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
                <div className="grow">
                    <SearchBar
                        items={Object.keys(level.chunks).filter((chunk) => chunk !== chunkName)}
                        active={chunkName}
                        placeholder={"Search Chunk..."}
                        onSelect={(chunk) => setChunkName(chunk)}
                    />
                </div>

                {/* menu selector */}
                <BasicDropdown button={<Bars3Icon className="h-6"/>}>
                    <div>
                        <BasicDropdownItem onClick={() => setDialog(EditorDialogs.LEVEL_EXPORT)}>
                            Export Level
                        </BasicDropdownItem>
                        <BasicDropdownItem onClick={() => setDialog(EditorDialogs.LEVEL_CHANGES_CLEAR)}>
                            Clear Changes
                        </BasicDropdownItem>
                    </div>
                    <BasicDropdownDivider/>
                    <div>
                        <BasicDropdownItem href={"/"}>Leave Editor</BasicDropdownItem>
                    </div>
                </BasicDropdown>

                {/* export dialog */}
                <BasicDialog
                    title="Export Level"
                    isOpen={dialog === EditorDialogs.LEVEL_EXPORT}
                    onClose={() => setDialog(null)}
                >
                    <div>Export the JSON data of the current edited level.</div>
                    <Textarea className="w-full h-32 p-2 bg-gray-500/5 rounded-md text-xs" readOnly>
                        {JSON.stringify(level)}
                    </Textarea>
                </BasicDialog>

                {/* clear dialog */}
                <BasicDialog
                    title={"Clear Changes"}
                    isOpen={dialog === EditorDialogs.LEVEL_CHANGES_CLEAR}
                    onClose={() => setDialog(null)}
                    submitButton={"Clear Changes"}
                    onSubmit={() => {
                        setDialog(null);
                        setLevel(props.downloadedLevel);
                    }}
                >
                    Do you really want to clear all changes? All unsaved changes will be lost.
                </BasicDialog>
            </div>

            {/* body */}
            <div className="grow flex gap-4">
                {/* tab buttons */}
                <div className="w-8 shrink-0 flex flex-col gap-2">
                    <TabButton active={tab === EditorTabs.GENERAL} onClick={() => setTab(EditorTabs.GENERAL)}>
                        <AtSymbolIcon/>
                    </TabButton>
                    <TabButton active={tab === EditorTabs.JOINTS} onClick={() => setTab(EditorTabs.JOINTS)}>
                        <PuzzlePieceIcon/>
                    </TabButton>
                    <TabButton active={tab === EditorTabs.ELEMENTS} onClick={() => setTab(EditorTabs.ELEMENTS)}>
                        <Square2StackIcon/>
                    </TabButton>
                    <div className="grow"></div>
                    <TabButton active={tab === EditorTabs.TEST} onClick={() => setTab(EditorTabs.TEST)}>
                        <PlayIcon/>
                    </TabButton>
                </div>

                {/* tab content */}
                <div className="w-72 shrink-0 rounded-xl bg-gray-500/10 overflow-hidden">
                    {/* TODO an sich sollte ich generell schauen, ob ich Duplikate sinnvoll im Refactoring zusammenführen kann*/}
                    {tab === EditorTabs.GENERAL &&
                        <EditorGeneralTab chunk={editChunk} onChunkChange={handleGeneralChange}/>
                    }
                    {tab === EditorTabs.JOINTS &&
                        <EditorJointsTab joints={editChunk.joints} onJointsChange={handleJointsChange}/>
                    }
                    {tab === EditorTabs.ELEMENTS &&
                        <EditorElementsTab elements={editChunk.elements} onElementsChange={handleElementsChange}/>
                    }
                    {tab === EditorTabs.TEST &&
                        <EditorTestTab/>
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