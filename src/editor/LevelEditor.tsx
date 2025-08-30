import {Level} from "../experience/world/Level";
import {Environment} from "../experience/Environment";
import React, {useState} from "react";
import {EditorChunkElementsTab} from "./tabs/EditorChunkElementsTab";
import {EditorTabButton} from "./component/EditorTabButton";
import {PlayIcon, RectangleGroupIcon, RectangleStackIcon} from "@heroicons/react/24/outline";
import {EditorPlayTestTab} from "./tabs/EditorPlayTestTab";
import {DebugSettingsDefault, DebugSettingsProvider} from "../experience/input/DebugSettingsProvider";
import {MoveBoardLogo} from "../component/asset/MoveBoardLogo";
import {EditorLevelStructureTab} from "./tabs/EditorLevelStructureTab";
import {LevelMenu} from "./LevelMenu";
import {EditorToaster} from "./component/EditorToaster";
import {useEditorActions, useEditorContext} from "./reducer/EditorProvider";
import {EditorInspector} from "./tabs/inspector/EditorInspector";
import {filterStructures} from "../data/helper/filterStructures";
import {ChunkModel} from "../data/model/structure/spatial/ChunkModel";
import {StructureType} from "../data/model/structure/StructureType";

enum EditorTabs {
    LEVEL_CHUNKS = "level_settings",
    CHUNK_ELEMENTS = "chunk_elements",
    PLAY_TEST = "play_test",
}

export function LevelEditor() {
    const editor = useEditorContext();
    const dispatchEditor = useEditorActions();

    const [debugSettings, setDebugSettings] = useState(DebugSettingsDefault);
    const [simulatorInstance, setSimulatorInstance] = useState<number>(0);

    const [tab, setTab] = useState<EditorTabs>(EditorTabs.LEVEL_CHUNKS);

    if (!editor || !dispatchEditor) {
        return <></>;
    }
    const editLevel = editor.level;
    const editChunks = filterStructures<ChunkModel>(editLevel.structures, StructureType.Chunk)
    const editChunk = editChunks[editor.active];
    const editErrors = editor.errors;

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
                <div className="text-2xl font-semibold">Moveboard Editor</div>

                {/* spacer */}
                <div className="grow"/>

                {/* menu selector */}
                <LevelMenu level={editLevel} levelDispatcher={dispatchEditor}/>
            </div>

            {/* error notifications */}
            <EditorToaster errors={editErrors}/>

            {/* body */}
            <div className="grow flex gap-4">
                {/* tab buttons */}
                <div className="w-8 shrink-0 flex flex-col gap-2">
                    <EditorTabButton active={tab === EditorTabs.LEVEL_CHUNKS} onClick={() => setTab(EditorTabs.LEVEL_CHUNKS)}>
                        <RectangleGroupIcon/>
                    </EditorTabButton>
                    <EditorTabButton active={tab === EditorTabs.CHUNK_ELEMENTS} onClick={() => setTab(EditorTabs.CHUNK_ELEMENTS)}>
                        <RectangleStackIcon/>
                    </EditorTabButton>
                    <div className="grow"/>
                    <EditorTabButton active={tab === EditorTabs.PLAY_TEST} onClick={() => setTab(EditorTabs.PLAY_TEST)}>
                        <PlayIcon/>
                    </EditorTabButton>
                </div>

                {/* list content */}
                <div className="w-64 shrink-0 overflow-auto resize-x min-w-40">
                    {tab === EditorTabs.LEVEL_CHUNKS &&
                        <EditorLevelStructureTab
                            level={editLevel}
                            activeChunk={editChunk}
                            levelDispatcher={dispatchEditor}
                        />
                    }
                    {tab === EditorTabs.CHUNK_ELEMENTS &&
                        <EditorChunkElementsTab
                            selected={editor.selected}
                            elements={editChunk.elements}
                            dispatcher={dispatchEditor}
                        />
                    }
                    {tab === EditorTabs.PLAY_TEST &&
                        <EditorPlayTestTab
                            settings={debugSettings}
                            onSettingChange={handleSettingsChange}
                            onRestart={() => setSimulatorInstance(simulatorInstance+1)}
                        />
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

                {/* inspector */}
                {tab !== EditorTabs.PLAY_TEST &&
                    <div className="w-64 shrink-0 overflow-auto resize-x min-w-40">
                        <EditorInspector
                            level={editLevel}
                            chunk={editChunk}
                            selected={editor.selected}
                            dispatcher={dispatchEditor}
                        />
                    </div>
                }
            </div>
        </div>
    );
}