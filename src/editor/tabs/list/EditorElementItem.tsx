import {EyeIcon, EyeSlashIcon, TrashIcon} from "@heroicons/react/24/outline";
import React from "react";
import {UUID} from "../../../data/model/shared/UUID";
import {ElementModel} from "../../../data/model/element/ElementModel";
import {GroupModel} from "../../../data/model/element/system/GroupModel";
import {EditorElementSlug} from "../slug/EditorElementSlug";
import {EditorGroupSlug} from "../slug/EditorGroupSlug";
import {EditorJointSlug} from "../slug/EditorJointSlug";
import {JointModel} from "../../../data/model/element/joint/JointModel";
import {ElementTypes} from "../../../data/model/element/ElementTypes";
import {ChunkID} from "../../../data/model/structure/spacial/ChunkModel";

export type EditorElementItemProps = {
    element: ElementModel;
    selected: boolean;
    onSelect: (id: UUID) => void;
    onRename: (id: UUID, name: string) => void;
    onRemove: (id: UUID) => void;
    onChunkChange: (id: ChunkID) => void;
    onHideToggle: (id: UUID) => void;
    onCollapseToggle: (id: UUID) => void;
    children?: React.ReactNode;
}

export function EditorElementItem(props: EditorElementItemProps) {
    const handleSelect = () => {
        props.onSelect(props.element.id);
    }

    const handleRename = (name: string) => {
        props.onRename(props.element.id, name);
    }

    const handleRemove = () => {
        props.onRemove(props.element.id);
    }

    const handleChunkChange = () => {
        props.onChunkChange(props.element.id);
    }

    const handleHideToggle = (e: any) => {
        e.stopPropagation();
        props.onHideToggle(props.element.id);
    }

    const handleCollapseToggle = () => {
        if (props.element.type === ElementTypes.Group) {
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
                <button onClick={handleHideToggle} className="p-2 rounded-full hover:bg-gray-500/10">
                    {props.element.hidden
                        ? <EyeSlashIcon className="w-4"/>
                        : <EyeIcon className="w-4"/>
                    }
                </button>
                <div className="grow flex gap-2">
                    {(() => {
                        switch(props.element.type) {
                            case ElementTypes.Group:
                                return <EditorGroupSlug
                                    element={props.element as GroupModel}
                                    onCollapse={handleCollapseToggle}
                                    onExpand={handleCollapseToggle}
                                    onRename={handleRename}
                                />;
                            case ElementTypes.Joint:
                                return <EditorJointSlug
                                    element={props.element as JointModel}
                                    onChunkChange={handleChunkChange}
                                    onRename={handleRename}
                                />;
                            default:
                                return <EditorElementSlug
                                    element={props.element}
                                    onRename={handleRename}
                                />;
                        }
                    })()}
                </div>
                <button onClick={handleRemove} className="p-2 rounded-full invisible group-hover:visible hover:bg-gray-500/10">
                    <TrashIcon className="w-4 text-black"/>
                </button>
            </div>
            {props.children && props.element.type === ElementTypes.Group && !(props.element as GroupModel).collapsed && (
                <div className="ml-6">
                    {props.children}
                </div>
            )}
        </li>
    );
}
