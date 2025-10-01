import {EditorDropdownMenu} from "./menu/EditorDropdownMenu";
import {EditorStructureOverview} from "./structure/EditorStructureOverview";
import {
    ArrowUturnLeftIcon, ArrowUturnRightIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronDownIcon, PlayIcon, StopIcon,
} from "@heroicons/react/24/outline";
import React, {ReactNode} from "react";
import {MoveBoardLogo} from "../../component/asset/MoveBoardLogo";
import {useEditorActions, useEditorActiveStructure, useEditorContext, useEditorLevel} from "../reducer/EditorProvider";

export type EditorCollapsibleActionsProps = {
    isSimulation: boolean,
    onSimulationButtonClick: () => void,
}

export function EditorCollapsibleActions(props: EditorCollapsibleActionsProps) {
    const [isCollapsed, setCollapsed] = React.useState(false);

    const dispatcher = useEditorActions();
    const editor = useEditorContext();
    const level = useEditorLevel();

    if (!dispatcher || !editor || !level) {
        return <></>;
    }

    const selectedStructure = editor?.selectedStructure

    const handleCollapse = () => {
        setCollapsed(!isCollapsed);
    }

    const handleUndo = () => {
        dispatcher({ type: "editor_undo" });
    }

    const handleRedo = () => {
        dispatcher({ type: "editor_redo" });
    }

    return (
        <div className={"shrink-0 h-full py-4 flex flex-col relative transition-all " + (isCollapsed ? "w-16" : "w-60")}>
            {/* header */}
            <div className="w-full p-2">
                <EditorDropdownMenu
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
                <EditorStructureOverview
                    level={level}
                    selectedStructure={selectedStructure}
                    levelDispatcher={dispatcher}
                />
            </div>

            {/* actions */}
            <div className={"w-full px-2 flex gap-4 justify-between " + (isCollapsed ? "flex-col-reverse" : "flex-row")}>
                <StructureMenuButton onClick={props.onSimulationButtonClick}>
                    {props.isSimulation
                        ? <StopIcon className="w-6" />
                        : <PlayIcon className="w-6" />
                    }
                </StructureMenuButton>

                <div className={"flex " + (isCollapsed ? "flex-col" : "flex-row")}>
                    <StructureMenuButton onClick={handleUndo}>
                        <ArrowUturnLeftIcon className="w-5"/>
                    </StructureMenuButton>
                    <StructureMenuButton onClick={handleRedo}>
                        <ArrowUturnRightIcon className="w-5"/>
                    </StructureMenuButton>
                </div>
            </div>

            {/* collapse button */}
            <button
                className="absolute right-0 bottom-1/2 px-1 py-3 rounded-l-2xl text-xs shadow-2xl bg-white/75 hover:bg-white cursor-pointer"
                onClick={handleCollapse}
            >
                {isCollapsed
                    ? <ChevronDoubleRightIcon className="w-4"/>
                    : <ChevronDoubleLeftIcon className="w-4"/>
                }
            </button>
        </div>
    );
}

type StructureMenuButtonProps = {
    children: ReactNode;
    onClick: () => void;
}
function StructureMenuButton(props: StructureMenuButtonProps) {
    return (
        <button
            className="flex justify-center px-3 py-2 rounded-lg  hover:bg-gray-500/10"
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}