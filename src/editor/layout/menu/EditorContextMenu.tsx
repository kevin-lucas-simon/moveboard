import React from "react";
import {EditorDialogProps} from "../../dialog/EditorDialogProps";
import {EllipsisHorizontalIcon} from "@heroicons/react/24/outline";
import {BaseMenu} from "../../component/BaseMenu";

export type EditorContextMenuProps = {
    className?: string,
    dialogs: {[key: string]: React.ComponentType<EditorDialogProps>},
}

export function EditorContextMenu(props: EditorContextMenuProps) {
    return (
        <BaseMenu dialogs={props.dialogs} className={"p-2 -mx-2 -my-1 rounded-full hover:bg-gray-500/10 " + props.className}>
            <EllipsisHorizontalIcon className="w-4"/>
        </BaseMenu>
    )
}