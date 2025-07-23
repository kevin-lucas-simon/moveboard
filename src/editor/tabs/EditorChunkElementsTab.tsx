import {createElement, ElementModel} from "../../data/model/element/ElementModel";
import React from "react";
import {elementConfig} from "../../config/elementConfig";
import {BaseTab} from "./BaseTab";
import {ElementType} from "../../data/model/element/ElementType";
import {EditorReducerActions} from "../reducer/editorReducer";
import {UUID} from "../../data/model/shared/UUID";
import {ElementListItem} from "../input/ElementListItem";
import {JsonNestedEditor} from "../input/JsonNestedEditor";

export type EditorChunkElementsTabProps = {
    elements: {[key: string]: ElementModel};
    selected: UUID[];
    dispatcher: React.Dispatch<EditorReducerActions>;
    isTabOpen: boolean;
}

export function EditorChunkElementsTab(props: EditorChunkElementsTabProps) {
    const selectedElement = props.selected[0] ? props.elements[props.selected[0]] : undefined;

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
        <>
            <BaseTab
                title={"Chunk Elements"}
                description={"Fill the chunk area with static elements."}
                addOptions={Object.keys(elementConfig)}
                onAdd={addElement}
                className={props.isTabOpen ? "block" : "hidden"}
                key={selectedElement ? "selected" : "not-selected"}
            >
                <ul>
                    {Object.entries(props.elements).map(([key, element]) => (
                        <ElementListItem
                            key={key}
                            id={element.id}
                            display={element.type}
                            selected={props.selected.includes(element.id)}
                            onSelect={selectElement}
                            onRemove={removeElement}
                        />
                    ))}
                </ul>
            </BaseTab>

            <BaseTab
                title={selectedElement?.type ?? "Details"}
                className={props.isTabOpen && selectedElement ? "w-40" : "hidden"}
            >
                {selectedElement &&
                    <ul className="mt-2">
                        <JsonNestedEditor
                            keyName={selectedElement.type}
                            value={selectedElement}
                            onKeyValueChange={(key, value) => changeElement(selectedElement.id, value)}
                        />
                    </ul>
                }
            </BaseTab>
        </>
    );

}
