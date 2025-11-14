import React from "react";
import {MoveBoardLogo} from "../../../component/asset/MoveBoardLogo";
import {BaseMenu, BaseMenuDialogs} from "../../component/BaseMenu";

export type EditorMainMenuProps = {
    collapsed: boolean,
    dialogs: BaseMenuDialogs,
}

export function EditorMainMenu(props: EditorMainMenuProps) {
    return (
        <div className="px-2 py-3 shrink-0">
            <BaseMenu dialogs={props.dialogs} className="h-8 flex items-center gap-2 rounded-lg hover:bg-gray-500/10 px-3 py-5">
                <MoveBoardLogo />
                {!props.collapsed && <>
                    <div className="text-2xl font-semibold ml-1">Moveboard</div>
                </>}
            </BaseMenu>
        </div>
    );
}
