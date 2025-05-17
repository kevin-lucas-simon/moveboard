import {Level} from "../experience/world/Level";
import {Environment} from "../experience/Environment";
import {useReducer, useState} from "react";
import React from "react";
import {EditorElementsTab} from "./tabs/EditorElementsTab";
import {TabButton} from "./component/TabButton";
import {
    AtSymbolIcon, Bars3Icon,
    PlayIcon,
    PuzzlePieceIcon,
    Square2StackIcon
} from "@heroicons/react/24/outline";
import {EditJointsTab} from "./tabs/EditJointsTab";
import {EditGeneralTab} from "./tabs/EditGeneralTab";
import {EditTestTab} from "./tabs/EditTestTab";
import {BasicDropdown} from "../component/dropdown/BasicDropdown";
import {BasicDropdownItem} from "../component/dropdown/BasicDropdownItem";
import {BasicDropdownDivider} from "../component/dropdown/BasicDropdownDivider";
import {BasicDialog} from "../component/dialog/BasicDialog";
import {LevelModel} from "../model/LevelModel";
import {Textarea} from "@headlessui/react";
import {SearchBar} from "../component/dropdown/SearchBar";
import {DebugSettingsProvider, DebugSettingsDefault} from "../experience/input/DebugSettingsProvider";
import {MoveBoardLogo} from "../component/asset/MoveBoardLogo";
import {levelReducer} from "./reducer/levelReducer";

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
    const [debugSettings, setDebugSettings] = useState(DebugSettingsDefault);
    const [simulatorInstance, setSimulatorInstance] = useState<number>(0);

    const[editor, dispatchEditor] = useReducer(levelReducer, {
        level: props.downloadedLevel,
        active: props.downloadedLevel.start,
    })
    const editLevel = editor.level;
    const editChunk = editLevel.chunks[editor.active];

    const [tab, setTab] = useState<EditorTabs>(EditorTabs.GENERAL);
    const [dialog, setDialog] = useState<EditorDialogs|null>(null);

    const handleSettingsChange = (key: string, value: any) => {
        setDebugSettings({
            ...debugSettings,
            [key]: value,
        })
    }

    return (
        <div className="w-full h-full flex flex-col gap-4 p-4">
            {/* header */}
            <div className="flex gap-4 h-8 items-center">
                {/* logo */}
                <MoveBoardLogo />
                {/* editing name */}
                <div className="flex flex-col gap-0.5">
                    <h1 className="text-2xl leading-none">{editChunk.name}</h1>
                    <div className="text-xs leading-none">{editLevel.name}</div>
                </div>

                {/* chunk search */}
                <div className="grow">
                    <SearchBar
                        items={Object.keys(editLevel.chunks).filter((chunk) => chunk !== editor.active)}
                        active={editor.active}
                        placeholder={"Search Chunk..."}
                        onSelect={(chunk) => dispatchEditor({
                            type: 'level_select_chunk',
                            payload: chunk,
                        })}
                        onCreate={(chunk) => {
                            dispatchEditor({
                                type: 'level_add_chunk',
                                payload: chunk,
                            })
                            dispatchEditor({
                                type: 'level_select_chunk',
                                payload: chunk,
                            })
                        }}
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
                    <Textarea
                        className="w-full h-32 p-2 bg-gray-500/5 rounded-md text-xs"
                        value={JSON.stringify(editLevel)}
                        readOnly
                    />
                </BasicDialog>

                {/* clear dialog */}
                <BasicDialog
                    title={"Clear Changes"}
                    isOpen={dialog === EditorDialogs.LEVEL_CHANGES_CLEAR}
                    onClose={() => setDialog(null)}
                    submitButton={"Clear Changes"}
                    onSubmit={() => {
                        setDialog(null);
                        dispatchEditor({
                            type: 'level_reset',
                            payload: props.downloadedLevel,
                        });
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
                    {tab === EditorTabs.GENERAL &&
                        <EditGeneralTab chunk={editChunk} chunkDispatcher={dispatchEditor}/>
                    }
                    {tab === EditorTabs.JOINTS &&
                        <EditJointsTab joints={editChunk.joints} chunkNames={Object.keys(editLevel.chunks)} chunkDispatcher={dispatchEditor}/>
                    }
                    {tab === EditorTabs.ELEMENTS &&
                        <EditorElementsTab elements={editChunk.elements} chunkDispatcher={dispatchEditor}/>
                    }
                    {tab === EditorTabs.TEST &&
                        <EditTestTab settings={debugSettings} onSettingChange={handleSettingsChange} onRestart={() => setSimulatorInstance(simulatorInstance+1)} />
                    }
                </div>

                {/* 3d canvas */}
                <DebugSettingsProvider debugSettings={{
                    ...debugSettings,
                    displayEditorFeatures: tab === EditorTabs.TEST ? debugSettings.displayEditorFeatures : true,
                    moveableCamera: tab === EditorTabs.TEST ? debugSettings.moveableCamera : true,
                    pauseSimulation: tab === EditorTabs.TEST ? debugSettings.pauseSimulation : true,
                }}>
                    <Environment
                        className="rounded-xl bg-gray-500/10"
                        key={tab === EditorTabs.TEST ? editor.active + simulatorInstance : editor.active}
                        isGranted={tab === EditorTabs.TEST}
                    >
                        {editLevel &&
                            <Level {...editLevel} start={editor.active}/>
                        }
                    </Environment>
                </DebugSettingsProvider>
            </div>
        </div>
    );
}