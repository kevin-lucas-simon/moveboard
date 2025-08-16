import {EyeIcon, EyeSlashIcon, FolderIcon, FolderOpenIcon, LinkIcon, TrashIcon} from "@heroicons/react/24/outline";
import React from "react";
import {UUID} from "../../../data/model/shared/UUID";
import {ChunkID} from "../../../data/model/world/ChunkModel";
import {ElementModel} from "../../../data/model/element/ElementModel";
import {ElementType} from "../../../data/model/element/ElementType";
import {GroupModel} from "../../../data/model/element/GroupModel";

export type EditorElementItemProps = {
    element: ElementModel;
    selected: boolean;
    onSelect: (id: UUID) => void;
    onRemove: (id: UUID) => void;
    onChunkChange: (id: ChunkID) => void;
    onHideToggle: (id: UUID) => void;
    onCollapseToggle: (id: UUID) => void;
    children?: React.ReactNode;
}

export function EditorElementItem(props: EditorElementItemProps) {
    const handleSelect = (e: any) => {
        e.stopPropagation();
        props.onSelect(props.element.id);
    }

    const handleRemove = (e: any) => {
        e.stopPropagation();
        props.onRemove(props.element.id);
    }

    const handleChunkChange = (e: any) => {
        e.stopPropagation();
        props.onChunkChange(props.element.id);
    }

    const toggleHide = (e: any) => {
        e.stopPropagation();
        if (props.onHideToggle) {
            props.onHideToggle(props.element.id);
        }
    }

    const toggleCollapse = (e: any) => {
        e.stopPropagation();
        if (props.onCollapseToggle && props.element.type === ElementType.Group) {
            props.onCollapseToggle(props.element.id);
        }
    }

    return (
        <li className={props.selected ? "bg-gray-500/10 "  : ""}>
            <div
                onClick={handleSelect}
                className={
                    "flex group hover:bg-gray-500/10 px-2 py-0.5 items-center "
                    + (props.element.hidden ? "text-gray-500/50 " : "")
                }
            >
                <button onClick={toggleHide} className="p-2 rounded-full hover:bg-gray-500/10">
                    {props.element.hidden
                        ? <EyeSlashIcon className="w-4"/>
                        : <EyeIcon className="w-4"/>
                    }
                </button>
                <div className="grow flex gap-2">
                    {props.element.type === ElementType.Group &&
                        <button onClick={toggleCollapse} className="p-2 -mx-2 -my-1 rounded-full hover:bg-gray-500/10">
                            {(props.element as GroupModel).collapsed
                                ? <FolderIcon className="w-4"/>
                                : <FolderOpenIcon className="w-4"/>
                            }
                        </button>
                    }
                    {props.element.type === ElementType.Joint &&
                        <button onClick={handleChunkChange} className="p-2 -mx-2 -my-1 rounded-full hover:bg-gray-500/10">
                            <LinkIcon className="w-4"/>
                        </button>
                    }
                    <button>{!props.element.name ? props.element.type : props.element.name}</button>
                </div>
                <button onClick={handleRemove} className="p-2 rounded-full invisible group-hover:visible hover:bg-gray-500/10">
                    <TrashIcon className="w-4 text-black"/>
                </button>
            </div>
            {props.children && props.element.type === ElementType.Group && !(props.element as GroupModel).collapsed && (
                <div className="ml-6">
                    {props.children}
                </div>
            )}
        </li>
    );
}
