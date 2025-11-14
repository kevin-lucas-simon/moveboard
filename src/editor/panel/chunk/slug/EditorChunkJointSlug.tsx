import {JointModel} from "../../../../data/model/element/joint/JointModel";
import {EditorChunkElementSlug} from "./EditorChunkElementSlug";
import {LinkIcon, LinkSlashIcon} from "@heroicons/react/24/outline";
import React from "react";

export type EditorChunkJointSlugProps = {
    element: JointModel;
    onChunkChange: () => void;
    onRename: (name: string) => void;
}

export function EditorChunkJointSlug(props: EditorChunkJointSlugProps) {
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
            <EditorChunkElementSlug
                element={props.element}
                onRename={props.onRename}
            />
        </>
    );
}
