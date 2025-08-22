import {JointModel} from "../../../data/model/element/joint/JointModel";
import {EditorElementSlug} from "./EditorElementSlug";
import {LinkIcon, LinkSlashIcon} from "@heroicons/react/24/outline";
import React from "react";

export type EditorJointSlugProps = {
    element: JointModel;
    onChunkChange: () => void;
    onRename: (name: string) => void;
}

export function EditorJointSlug(props: EditorJointSlugProps) {
    const changeChunk = (e: any) => {
        e.stopPropagation();
        if (!props.element.neighbour) {
            return;
        }
        props.onChunkChange();
    }

    return (
        <>
            <button onClick={changeChunk} className="p-2 -mx-2 -my-1 rounded-full hover:bg-gray-500/10">
                {!props.element.neighbour
                    ? <LinkSlashIcon className="w-4"/>
                    : <LinkIcon className="w-4"/>
                }
            </button>
            <EditorElementSlug
                element={props.element}
                onRename={props.onRename}
            />
        </>
    );
}
