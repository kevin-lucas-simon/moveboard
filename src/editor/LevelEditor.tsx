import {Level} from "../experience/world/Level";
import {Environment} from "../experience/Environment";
import {useReducer, useState} from "react";
import React from "react";
import {EditorChunkElementsTab} from "./tabs/EditorChunkElementsTab";
import {EditorTabButton} from "./component/EditorTabButton";
import {
    LinkIcon, PlayIcon, PuzzlePieceIcon, RectangleGroupIcon, RectangleStackIcon
} from "@heroicons/react/24/outline";
import {EditorChunkJointsTab} from "./tabs/EditorChunkJointsTab";
import {EditorChunkSettingsTab} from "./tabs/EditorChunkSettingsTab";
import {EditorPlayTestTab} from "./tabs/EditorPlayTestTab";
import {LevelModel} from "../model/LevelModel";
import {ChunkSwitcher} from "./component/ChunkSwitcher";
import {DebugSettingsProvider, DebugSettingsDefault} from "../experience/input/DebugSettingsProvider";
import {MoveBoardLogo} from "../component/asset/MoveBoardLogo";
import {levelReducer} from "./reducer/levelReducer";
import {EditorLevelSettingsTab} from "./tabs/EditorLevelSettingsTab";
import {LevelMenu} from "./component/LevelMenu";

enum EditorTabs {
    LEVEL_SETTINGS = "level_settings",
    CHUNK_SETTINGS= "chunk_settings",
    CHUNK_JOINTS = "chunk_joints",
    CHUNK_ELEMENTS = "chunk_elements",
    PLAY_TEST = "play_test",
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

    const [tab, setTab] = useState<EditorTabs>(EditorTabs.CHUNK_SETTINGS);

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
                {/* chunk selection */}
                <div className="w-72 shrink-0">
                    <ChunkSwitcher
                        chunks={editLevel.chunks}
                        active={editor.active}
                        levelDispatcher={dispatchEditor}
                    />
                </div>

                {/* spacer */}
                <div className="grow"/>

                {/* menu selector */}
                <LevelMenu level={editLevel} levelDispatcher={dispatchEditor}/>
            </div>

            {/* body */}
            <div className="grow flex gap-4">
                {/* tab buttons */}
                <div className="w-8 shrink-0 flex flex-col gap-2">
                    <EditorTabButton active={tab === EditorTabs.LEVEL_SETTINGS} onClick={() => setTab(EditorTabs.LEVEL_SETTINGS)}>
                        <RectangleGroupIcon/>
                    </EditorTabButton>
                    <div className="my-1 w-full border border-gray-500/20"></div>
                    <EditorTabButton active={tab === EditorTabs.CHUNK_SETTINGS} onClick={() => setTab(EditorTabs.CHUNK_SETTINGS)}>
                        <PuzzlePieceIcon/>
                    </EditorTabButton>
                    <EditorTabButton active={tab === EditorTabs.CHUNK_JOINTS} onClick={() => setTab(EditorTabs.CHUNK_JOINTS)}>
                        <LinkIcon/>
                    </EditorTabButton>
                    <EditorTabButton active={tab === EditorTabs.CHUNK_ELEMENTS} onClick={() => setTab(EditorTabs.CHUNK_ELEMENTS)}>
                        <RectangleStackIcon/>
                    </EditorTabButton>
                    <div className="grow"></div>
                    <EditorTabButton active={tab === EditorTabs.PLAY_TEST} onClick={() => setTab(EditorTabs.PLAY_TEST)}>
                        <PlayIcon/>
                    </EditorTabButton>
                </div>

                {/* tab content */}
                <div className="w-72 shrink-0 rounded-xl bg-gray-500/10 overflow-hidden">
                    {tab === EditorTabs.LEVEL_SETTINGS &&
                        <EditorLevelSettingsTab level={editLevel} levelDispatcher={dispatchEditor}/>
                    }
                    {tab === EditorTabs.CHUNK_SETTINGS &&
                        <EditorChunkSettingsTab chunk={editChunk} levelDispatcher={dispatchEditor} currentChunk={editor.active} startChunk={editLevel.start}/>
                    }
                    {tab === EditorTabs.CHUNK_JOINTS &&
                        <EditorChunkJointsTab joints={editChunk.joints} currentChunk={editor.active} chunkNames={Object.keys(editLevel.chunks)} levelDispatcher={dispatchEditor}/>
                    }
                    {tab === EditorTabs.CHUNK_ELEMENTS &&
                        <EditorChunkElementsTab elements={editChunk.elements} chunkDispatcher={dispatchEditor}/>
                    }
                    {tab === EditorTabs.PLAY_TEST &&
                        <EditorPlayTestTab settings={debugSettings} onSettingChange={handleSettingsChange} onRestart={() => setSimulatorInstance(simulatorInstance+1)} />
                    }
                </div>

                {/* 3d canvas */}
                <DebugSettingsProvider debugSettings={{
                    ...debugSettings,
                    isEditingMode: tab === EditorTabs.PLAY_TEST ? debugSettings.isEditingMode : true,
                    displayEditorFeatures: tab === EditorTabs.PLAY_TEST ? debugSettings.displayEditorFeatures : true,
                    moveableCamera: tab === EditorTabs.PLAY_TEST ? debugSettings.moveableCamera : true,
                    pauseSimulation: tab === EditorTabs.PLAY_TEST ? debugSettings.pauseSimulation : true,
                }}>
                    <Environment
                        className="rounded-xl bg-gray-500/10"
                        key={tab === EditorTabs.PLAY_TEST ? `${editor.active}_${simulatorInstance}` : `${editor.active}`}
                        isGranted={tab === EditorTabs.PLAY_TEST}
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