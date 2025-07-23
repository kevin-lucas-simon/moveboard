import {EyeIcon, TrashIcon} from "@heroicons/react/24/outline";
import React from "react";
import {UUID} from "../../data/model/shared/UUID";

export type EditorListItemProps = {
    id: UUID;
    display: string;
    selected: boolean;
    onSelect: (id: UUID) => void;
    onHide?: (id: UUID) => void;
    onShow?: (id: UUID) => void;
    onRemove: (id: UUID) => void;
}

export function ElementListItem(props: EditorListItemProps) {
    const handleSelect = (e: any) => {
        e.stopPropagation();
        props.onSelect(props.id);
    }

    const handleHide = (e: any) => {
        // TODO hide/show logic
        e.stopPropagation();
    }

    const handleRemove = (e: any) => {
        e.stopPropagation();
        props.onRemove(props.id);
    }

    return (
        <li className={props.selected ? "bg-gray-500/10" : ""}>
            <div onDoubleClick={handleSelect} className="flex group hover:bg-gray-500/10 px-2 py-0.5 items-center gap-1">
                <button onClick={handleHide} className="p-2 rounded-full hover:bg-gray-500/10">
                    <EyeIcon className="w-4"/>
                </button>
                <button className="grow flex gap-1">
                    {/*<FolderOpenIcon className="w-4"/>*/}
                    <span>{props.display}</span>
                </button>
                <button onClick={handleRemove} className="p-2 rounded-full invisible group-hover:visible hover:bg-gray-500/10">
                    <TrashIcon className="w-4"/>
                </button>
            </div>
        </li>
    );
}
