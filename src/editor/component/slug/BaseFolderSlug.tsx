import {FolderIcon, FolderOpenIcon} from "@heroicons/react/24/outline";
import React from "react";

export type BaseFolderSlugProps = {
    collapsed: boolean;
    onCollapseToggle: () => void;
}

export function BaseFolderSlug(props: BaseFolderSlugProps) {
    return (
        <button
            onClick={props.onCollapseToggle}
            className="p-2 -mx-2 rounded-full hover:bg-gray-500/10"
        >
            {props.collapsed
                ? <FolderIcon className="w-4"/>
                : <FolderOpenIcon className="w-4"/>
            }
        </button>
    );
}
