import {Level} from "../experience/world/Level";
import {Environment} from "../experience/Environment";
import React, {useState} from "react";
import {EditorChunkElementsTab} from "./tabs/EditorChunkElementsTab";
import {EditorTabButton} from "./component/EditorTabButton";
import {
    Bars3Icon,
    ChevronDoubleRightIcon, ChevronDownIcon,
    PlayIcon,
    RectangleGroupIcon,
    RectangleStackIcon
} from "@heroicons/react/24/outline";
import {EditorPlayTestTab} from "./tabs/EditorPlayTestTab";
import {DebugSettingsDefault, DebugSettingsProvider} from "../experience/input/DebugSettingsProvider";
import {MoveBoardLogo} from "../component/asset/MoveBoardLogo";
import {EditorLevelStructureTab} from "./tabs/EditorLevelStructureTab";
import {LevelMenu} from "./LevelMenu";
import {EditorToaster} from "./component/EditorToaster";
import {useEditorActions, useEditorContext} from "./reducer/EditorProvider";
import {EditorInspector} from "./tabs/inspector/EditorInspector";
import {StructureTypes} from "../data/model/structure/StructureTypes";
import {filterStructures} from "../data/factory/StructureFactory";
import {ChunkModel} from "../data/model/structure/spacial/ChunkModel";

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

    const [tab, setTab] = useState<EditorTabs>(EditorTabs.CHUNK_ELEMENTS);

    if (!editor || !dispatchEditor) {
        return <></>;
    }
    const editLevel = editor.level;
    const editChunks = filterStructures<ChunkModel>(editLevel.structures, StructureTypes.Chunk)
    const editChunk = editChunks[editor.active];
    const editErrors = editor.errors;

    const handleSettingsChange = (key: string, value: any) => {
        setDebugSettings({
            ...debugSettings,
            [key]: value,
        })
    }

    return (
        <div className="w-full h-full flex bg-gray-500/10">
            {/* error notifications */}
            <EditorToaster errors={editErrors}/>

            <div className="w-56 shrink-0 h-full flex flex-col">
                {/* header */}
                <div className="w-full px-2 py-6">
                    <LevelMenu level={editLevel} levelDispatcher={dispatchEditor}/>
                </div>

                {/* content */}
                <div className="w-full grow">
                    <EditorLevelStructureTab
                        level={editLevel}
                        activeChunk={editChunk}
                        selectedStructures={editor.selectedStructures}
                        levelDispatcher={dispatchEditor}
                    />
                </div>

                {/* actions */}
                <div className="w-full flex gap-2 p-4">
                    <PlayIcon className="w-6"/>
                    Test Play
                </div>
            </div>

            <div className="grow h-full flex p-4 pl-0 rounded-2xl overflow-hidden">
                <div className="shrink-0 -mr-4 rounded-2xl bg-white z-10 drop-shadow flex">
                    <div className="w-56">
                        <EditorChunkElementsTab
                            selected={editor.selectedElements}
                            elements={editChunk.elements}
                            dispatcher={dispatchEditor}
                        />
                    </div>
                    <div className="w-56 shadow-xl rounded-2xl">
                        <EditorInspector
                            level={editLevel}
                            chunk={editChunk}
                            selected={editor.selectedElements}
                            dispatcher={dispatchEditor}
                        />
                    </div>
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
                        className="grow rounded-2xl"
                        key={tab === EditorTabs.PLAY_TEST ? `${editor.active}_${simulatorInstance}` : `${editor.active}`}
                        isGranted={tab === EditorTabs.PLAY_TEST}
                    >
                        {editLevel &&
                            <Level {...editLevel} start={editor.active}/>
                        }
                    </Environment>
                </DebugSettingsProvider>
            </div>





            {/*/!* body *!/*/}
            {/*<div className="grow flex gap-1">*/}
            {/*    <div className="shrink-0 flex flex-col gap-4">*/}
            {/*        <div className="grow rounded-xl hover:bg-gray-500/10 flex items-center">*/}
            {/*            <ChevronDoubleRightIcon className="h-6 mx-auto"/>*/}
            {/*        </div>*/}
            {/*        <EditorTabButton active={tab === EditorTabs.PLAY_TEST} onClick={() => setTab(EditorTabs.PLAY_TEST)}>*/}
            {/*            <PlayIcon/>*/}
            {/*        </EditorTabButton>*/}
            {/*    </div>*/}


            {/*    /!* tab buttons *!/*/}
            {/*    /!*<div className="w-8 shrink-0 flex flex-col gap-2">*!/*/}
            {/*    /!*    <EditorTabButton active={tab === EditorTabs.LEVEL_CHUNKS} onClick={() => setTab(EditorTabs.LEVEL_CHUNKS)}>*!/*/}
            {/*    /!*        <RectangleGroupIcon/>*!/*/}
            {/*    /!*    </EditorTabButton>*!/*/}
            {/*    /!*    <EditorTabButton active={tab === EditorTabs.CHUNK_ELEMENTS} onClick={() => setTab(EditorTabs.CHUNK_ELEMENTS)}>*!/*/}
            {/*    /!*        <RectangleStackIcon/>*!/*/}
            {/*    /!*    </EditorTabButton>*!/*/}
            {/*    /!*    <div className="grow"/>*!/*/}
            {/*    /!*    <EditorTabButton active={tab === EditorTabs.PLAY_TEST} onClick={() => setTab(EditorTabs.PLAY_TEST)}>*!/*/}
            {/*    /!*        <PlayIcon/>*!/*/}
            {/*    /!*    </EditorTabButton>*!/*/}
            {/*    /!*</div>*!/*/}

            {/*    /!* list content *!/*/}
            {/*    <div className="w-64 shrink-0 overflow-auto resize-x min-w-40">*/}
            {/*        {tab === EditorTabs.LEVEL_CHUNKS &&*/}
            {/*            <EditorLevelStructureTab*/}
            {/*                level={editLevel}*/}
            {/*                activeChunk={editChunk}*/}
            {/*                selectedStructures={editor.selectedStructures}*/}
            {/*                levelDispatcher={dispatchEditor}*/}
            {/*            />*/}
            {/*        }*/}
            {/*        {tab === EditorTabs.CHUNK_ELEMENTS &&*/}
            {/*            <EditorChunkElementsTab*/}
            {/*                selected={editor.selectedElements}*/}
            {/*                elements={editChunk.elements}*/}
            {/*                dispatcher={dispatchEditor}*/}
            {/*            />*/}
            {/*        }*/}
            {/*        {tab === EditorTabs.PLAY_TEST &&*/}
            {/*            <EditorPlayTestTab*/}
            {/*                settings={debugSettings}*/}
            {/*                onSettingChange={handleSettingsChange}*/}
            {/*                onRestart={() => setSimulatorInstance(simulatorInstance+1)}*/}
            {/*            />*/}
            {/*        }*/}
            {/*    </div>*/}

            {/*    /!* inspector *!/*/}
            {/*    {tab !== EditorTabs.PLAY_TEST &&*/}
            {/*        <div className="w-64 shrink-0 overflow-auto resize-x min-w-40">*/}
            {/*            <EditorInspector*/}
            {/*                level={editLevel}*/}
            {/*                chunk={editChunk}*/}
            {/*                selected={editor.selectedElements}*/}
            {/*                dispatcher={dispatchEditor}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*    }*/}

            {/*    /!* 3d canvas *!/*/}
            {/*    <DebugSettingsProvider debugSettings={{*/}
            {/*        ...debugSettings,*/}
            {/*        isEditingMode: tab === EditorTabs.PLAY_TEST ? debugSettings.isEditingMode : true,*/}
            {/*        displayEditorFeatures: tab === EditorTabs.PLAY_TEST ? debugSettings.displayEditorFeatures : true,*/}
            {/*        moveableCamera: tab === EditorTabs.PLAY_TEST ? debugSettings.moveableCamera : true,*/}
            {/*        pauseSimulation: tab === EditorTabs.PLAY_TEST ? debugSettings.pauseSimulation : true,*/}
            {/*    }}>*/}
            {/*        <Environment*/}
            {/*            className="rounded-xl bg-gray-500/10"*/}
            {/*            key={tab === EditorTabs.PLAY_TEST ? `${editor.active}_${simulatorInstance}` : `${editor.active}`}*/}
            {/*            isGranted={tab === EditorTabs.PLAY_TEST}*/}
            {/*        >*/}
            {/*            {editLevel &&*/}
            {/*                <Level {...editLevel} start={editor.active}/>*/}
            {/*            }*/}
            {/*        </Environment>*/}
            {/*    </DebugSettingsProvider>*/}
            {/*</div>*/}
        </div>
    );
}