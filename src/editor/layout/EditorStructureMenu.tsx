import {LevelMenu} from "../LevelMenu";
import {EditorLevelStructureTab} from "../tabs/EditorLevelStructureTab";
import {ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronDownIcon, PlayIcon} from "@heroicons/react/24/outline";
import React from "react";
import {LevelModel} from "../../data/model/world/LevelModel";
import {EditorReducerActions} from "../reducer/editorReducer";
import {ChunkModel} from "../../data/model/structure/spacial/ChunkModel";
import {StructureID} from "../../data/model/structure/StructureModel";
import {MoveBoardLogo} from "../../component/asset/MoveBoardLogo";

export type EditorCollapseBarType = {
    level: LevelModel;
    chunk: ChunkModel;
    selectedStructures: StructureID[];
    dispatcher: React.Dispatch<EditorReducerActions>;
}

export function EditorStructureMenu(props: EditorCollapseBarType) {
    const [isCollapsed, setCollapsed] = React.useState(false);

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
                        {!isCollapsed && <div className="text-2xl font-semibold">{props.level.name}</div>}
                        {!isCollapsed && <ChevronDownIcon className="w-6"/>}
                    </>}
                    level={props.level}
                    levelDispatcher={props.dispatcher}
                />
            </div>

            {/* content */}
            <div className={"w-full grow static " + (isCollapsed ? "invisible" : "block")}>
                <EditorLevelStructureTab
                    level={props.level}
                    activeChunk={props.chunk}
                    selectedStructures={props.selectedStructures}
                    levelDispatcher={props.dispatcher}
                />
            </div>

            {/* actions */}
            <div className={"w-full flex gap-2 p-4 transition-all overflow-hidden " + (isCollapsed ? "ml-1" : "")}>
                <PlayIcon className="w-6 shrink-0"/>
                <span className={"text-nowrap overflow-hidden " + (isCollapsed ? "w-0" : "w-auto")}>Test Play</span>
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
