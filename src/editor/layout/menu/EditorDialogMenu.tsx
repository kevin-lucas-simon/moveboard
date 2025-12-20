import React from "react";
import {EllipsisHorizontalIcon} from "@heroicons/react/24/outline";
import {BaseMenu, BaseMenuDialogs} from "../../component/BaseMenu";

export type EditorContextMenuProps = {
    dialogs: BaseMenuDialogs,
}

export function EditorDialogMenu(props: EditorContextMenuProps) {
    return (
        <BaseMenu dialogs={props.dialogs} className={"p-2 -mx-2 -my-1 rounded-full hover:bg-gray-500/10"}>
            <EllipsisHorizontalIcon className="w-4"/>
        </BaseMenu>
    )
}