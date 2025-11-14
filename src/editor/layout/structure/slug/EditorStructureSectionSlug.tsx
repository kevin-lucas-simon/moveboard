import {SectionModel} from "../../../../data/model/structure/system/SectionModel";
import {FolderIcon, FolderOpenIcon} from "@heroicons/react/24/outline";
import React from "react";
import {EditorStructureBaseSlug} from "./EditorStructureBaseSlug";

export type EditorStructureSectionSlugProps = {
    structure: SectionModel;
    onCollapse: () => void;
    onExpand: () => void;
    onRename: (name: string) => void;
}

export function EditorStructureSectionSlug(props: EditorStructureSectionSlugProps) {
    const toggleCollapse = (e: any) => {
        e.stopPropagation();
        props.structure.collapsed ? props.onExpand() : props.onCollapse();
    }

    return (
        <>
            <button
                onClick={toggleCollapse}
                className="p-2 -mx-2 -my-1 rounded-full hover:bg-gray-500/10"
            >
                {props.structure.collapsed
                    ? <FolderIcon className="w-4"/>
                    : <FolderOpenIcon className="w-4"/>
                }
            </button>
            <EditorStructureBaseSlug
                structure={props.structure}
                onRename={props.onRename}
            />
        </>
    );
}
