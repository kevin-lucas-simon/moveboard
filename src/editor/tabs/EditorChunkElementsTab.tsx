import {createElement, ElementModel} from "../../data/model/element/ElementModel";
import React from "react";
import {elementConfig} from "../../config/elementConfig";
import {ListObjectEditor} from "../input/ListObjectEditor";
import {BaseTab} from "./BaseTab";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {ElementType} from "../../data/model/element/ElementType";
import {EditorReducerActions} from "../reducer/editorReducer";
import {UUID} from "../../data/model/shared/UUID";

export type EditorChunkElementsTabProps = {
    elements: {[key: string]: ElementModel};
    selected: UUID[];
    dispatcher: React.Dispatch<EditorReducerActions>;
}

export function EditorChunkElementsTab(props: EditorChunkElementsTabProps) {
    const selectElement = (id: UUID) => {
        if (props.selected.includes(id)) {
            props.dispatcher({
                type: "editor_deselect_all",
            });
            return;
        }
        props.dispatcher({
            type: "editor_select",
            payload: id,
        });
    }

    const addElement = (type?: string) => {
        if (!type || !(type in elementConfig)) {
            return;
        }
        props.dispatcher({
            type: 'chunk_add_element',
            payload: createElement(type as ElementType)
        });
    }

    const changeElement = (index: string, value: ElementModel) => {
        props.dispatcher({
            type: 'chunk_update_element',
            payload: value,
        });
    }

    const removeElement = (index: string) => {
        props.dispatcher({
            type: 'chunk_remove_element',
            payload: index,
        });
    }

    return (
        <BaseTab
            title={"Chunk Elements"}
            description={"Fill the chunk area with static elements."}
            addOptions={Object.keys(elementConfig)}
            onAdd={addElement}
        >
            <ul>
                {
                    Object.entries(props.elements).map(([key, element]) => (
                        <li key={key} className="flex flex-col divide-gray-500/20">
                            <ListObjectEditor
                                key={key}
                                keyName={key}
                                displayname={element.type}
                                value={element}
                                onChange={changeElement}
                                actionButton={<XMarkIcon className="w-4"/>}
                                isExpanded={props.selected.includes(element.id)}
                                toggleExpand={() => selectElement(element.id)}
                                onAction={() => removeElement(key)}
                            />
                        </li>
                    ))
                }
            </ul>
        </BaseTab>
    );

}
