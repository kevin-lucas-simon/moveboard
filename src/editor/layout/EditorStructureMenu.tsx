import {LevelMenu} from "../LevelMenu";
import {EditorLevelStructureTab} from "../tabs/EditorLevelStructureTab";
import {ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronDownIcon, PlayIcon} from "@heroicons/react/24/outline";
import React from "react";
import {ChunkModel} from "../../data/model/structure/spacial/ChunkModel";
import {MoveBoardLogo} from "../../component/asset/MoveBoardLogo";
import {useEditorActions, useEditorActiveStructure, useEditorContext, useEditorLevel} from "../reducer/EditorProvider";
import {StructureTypes} from "../../data/model/structure/StructureTypes";

export type EditorStructureMenuProps = {
    onTestButtonClick: () => void;
}

export function EditorStructureMenu(props: EditorStructureMenuProps) {
    const [isCollapsed, setCollapsed] = React.useState(false);

    const dispatcher = useEditorActions();
    const editor = useEditorContext();
    const level = useEditorLevel();
    const chunk = useEditorActiveStructure<ChunkModel>(StructureTypes.Chunk)

    if (!dispatcher || !editor || !level || !chunk) {
        return <></>;
    }

    const selectedStructures = editor?.selectedStructures || [];

    const handleCollapse = () => {
        setCollapsed(!isCollapsed);
    }

    return (
        <div className={"shrink-0 h-full flex flex-col relative transition-all " + (isCollapsed ? "w-16" : "w-60")}>
            {/* header */}
            <div className="w-full px-2 pt-6 pb-2">
                <LevelMenu
                    button={<>
                        <MoveBoardLogo />
                        {!isCollapsed && <div className="text-2xl font-semibold">{level.name}</div>}
                        {!isCollapsed && <ChevronDownIcon className="w-6"/>}
                    </>}
                    level={level}
                    levelDispatcher={dispatcher}
                />
            </div>

            {/* content */}
            <div className={"w-full grow static " + (isCollapsed ? "invisible" : "block")}>
                <EditorLevelStructureTab
                    level={level}
                    activeChunk={chunk}
                    selectedStructures={selectedStructures}
                    levelDispatcher={dispatcher}
                />
            </div>

            {/* actions */}
            <div
                className={"w-full flex p-4 transition-all overflow-hidden"}
                onClick={props.onTestButtonClick}
            >
                <div className="flex gap-2 rounded-lg -m-1 p-2  hover:bg-gray-500/10">
                    <PlayIcon className="w-6 shrink-0"/>
                    {!isCollapsed && <span className="text-nowrap overflow-hidden ">Test Play</span>}
                </div>
            </div>

            <button
                className="absolute right-0 bottom-1/2 px-1 py-3 rounded-l-2xl text-xs shadow-2xl bg-white/75 hover:bg-white cursor-pointer"
                onClick={handleCollapse}
            >
                {!isCollapsed && <ChevronDoubleLeftIcon className="w-4"/>}
                {isCollapsed && <ChevronDoubleRightIcon className="w-4"/>}
            </button>
        </div>
    );
}
