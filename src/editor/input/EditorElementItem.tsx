import {EyeIcon, EyeSlashIcon, TrashIcon, FolderOpenIcon, FolderIcon} from "@heroicons/react/24/outline";
import React from "react";
import {UUID} from "../../data/model/shared/UUID";

export type EditorElementItemProps = {
    id: UUID;
    display: string;
    isSelected: boolean;
    isGroup: boolean;
    isCollapsed: boolean;
    hasParent: boolean;
    onSelect: (id: UUID) => void;
    onRemove: (id: UUID) => void;
    hidden: boolean;
    toggleHide: (id: UUID) => void;
    toggleCollapse: (id: UUID) => void;
    children?: React.ReactNode;
}

export function EditorElementItem(props: EditorElementItemProps) {
    const handleSelect = (e: any) => {
        e.stopPropagation();
        props.onSelect(props.id);
    }

    const handleRemove = (e: any) => {
        e.stopPropagation();
        props.onRemove(props.id);
    }

    const toggleHide = (e: any) => {
        e.stopPropagation();
        if (props.toggleHide) {
            props.toggleHide(props.id);
        }
    }

    const toggleCollapse = (e: any) => {
        e.stopPropagation();
        if (props.toggleCollapse && props.isGroup) {
            props.toggleCollapse(props.id);
        }
    }

    return (
        <li className={props.isSelected ? "bg-gray-500/10 "  : ""}>
            <div
                onClick={handleSelect}
                className={
                    "flex group hover:bg-gray-500/10 px-2 py-0.5 items-center "
                    + (props.hidden ? "text-gray-500/50 " : "")
                }
            >
                <button onClick={toggleHide} className="p-2 rounded-full hover:bg-gray-500/10">
                    {props.hidden
                        ? <EyeSlashIcon className="w-4"/>
                        : <EyeIcon className="w-4"/>
                    }
                </button>
                <div className="grow flex gap-2">
                    {props.isGroup && (
                        <button onClick={toggleCollapse} className="p-2 -mx-2 -my-1 rounded-full hover:bg-gray-500/10">
                            {props.isCollapsed
                                ? <FolderIcon className="w-4"/>
                                : <FolderOpenIcon className="w-4"/>
                            }
                        </button>
                    )}
                    <button>{props.display}</button>
                </div>
                <button onClick={handleRemove} className="p-2 rounded-full invisible group-hover:visible hover:bg-gray-500/10">
                    <TrashIcon className="w-4 text-black"/>
                </button>
            </div>
            {props.children && !props.isCollapsed && (
                <div className="ml-6">
                    {props.children}
                </div>
            )}
        </li>
    );
}
