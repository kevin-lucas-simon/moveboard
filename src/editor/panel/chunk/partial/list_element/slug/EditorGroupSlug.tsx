import {GroupModel} from "../../../../../../data/model/element/system/GroupModel";
import {EditorElementSlug} from "./EditorElementSlug";
import {FolderIcon, FolderOpenIcon} from "@heroicons/react/24/outline";
import React from "react";

export type EditorGroupSlugProps = {
    element: GroupModel;
    onCollapse: () => void;
    onExpand: () => void;
    onRename: (name: string) => void;
}

export function EditorGroupSlug(props: EditorGroupSlugProps) {
    const toggleCollapse = (e: any) => {
        e.stopPropagation();
        props.element.collapsed ? props.onExpand() : props.onCollapse();
    }

    return (
        <>
            <button
                onClick={toggleCollapse}
                className="p-2 -mx-2 -my-1 rounded-full hover:bg-gray-500/10"
            >
                {props.element.collapsed
                    ? <FolderIcon className="w-4"/>
                    : <FolderOpenIcon className="w-4"/>
                }
            </button>
            <EditorElementSlug
                element={props.element}
                onRename={props.onRename}
            />
        </>
    );
}
