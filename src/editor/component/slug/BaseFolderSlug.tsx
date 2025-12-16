import {FolderIcon, FolderOpenIcon} from "@heroicons/react/24/outline";
import React from "react";

export type BaseFolderSlugProps = {
    collapsed: boolean;
    onClick: () => void;
}

export function BaseFolderSlug(props: BaseFolderSlugProps) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        props.onClick();
    }

    return (
        <button
            onClick={handleClick}
            className="p-2 -mx-2 rounded-full hover:bg-gray-500/10"
        >
            {props.collapsed
                ? <FolderIcon className="w-4"/>
                : <FolderOpenIcon className="w-4"/>
            }
        </button>
    );
}
