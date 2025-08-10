import {createElement, ElementID, ElementModel} from "../../data/model/element/ElementModel";
import React from "react";
import {elementConfig} from "../../config/elementConfig";
import {BaseTab} from "./BaseTab";
import {ElementType} from "../../data/model/element/ElementType";
import {EditorReducerActions} from "../reducer/editorReducer";
import {UUID} from "../../data/model/shared/UUID";
import {ElementListItem} from "../input/ElementListItem";
import {JsonNestedEditor} from "../input/JsonNestedEditor";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {ReactSortable} from "react-sortablejs";

export type EditorChunkElementsTabProps = {
    elements: {[key: string]: ElementModel};
    selected: UUID[];
    dispatcher: React.Dispatch<EditorReducerActions>;
}

export function EditorChunkElementsTab(props: EditorChunkElementsTabProps) {
    const selectedElement = props.selected[0] ? props.elements[props.selected[0]] : undefined;

    const deselectElement = () => {
        props.dispatcher({
            type: "editor_deselect_all",
        });
    }

    const selectElement = (id: UUID) => {
        if (props.selected.includes(id)) {
            deselectElement();
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
            payload: index as ElementID,
        });
    }

    const toggleElementVisibility = (index: string, value: ElementModel) => {
        changeElement(index, {
            ...value,
            hidden: !(value.hidden ?? false)
        })
    }

    const reorderElements = (newState: ElementModel[]) => {
        const newOrder: ElementID[] = [];
        newState.forEach((element, index) => {
            newOrder.push(element.id);
        });

        props.dispatcher({
            type: 'chunk_reorder_elements',
            payload: newOrder,
        })
    }

    return (
        <div className="w-full h-full flex flex-col gap-2 overflow-y-hidden">
            <div
                className={"min-h-24 "+ (selectedElement ? "h-3/5 shrink-0 overflow-hidden resize-y" : "h-full grow")}
                style={selectedElement ? {maxHeight: "75vh"} : {}}
            >
                <BaseTab
                    title={"Chunk Elements"}
                    description={"Fill the chunk area with static elements."}
                    addOptions={Object.keys(elementConfig)}
                    onAction={addElement}
                >
                    <ul>
                        <ReactSortable list={Object.values(props.elements)} setList={reorderElements}>
                            {Object.values(props.elements).map((element) => (
                                <ElementListItem
                                    key={element.id}
                                    id={element.id}
                                    display={element.type}
                                    hidden={element.hidden}
                                    selected={props.selected.includes(element.id)}
                                    onSelect={selectElement}
                                    onRemove={removeElement}
                                    toggleHide={(id) => toggleElementVisibility(id, element)}
                                />
                            ))}
                        </ReactSortable>
                    </ul>
                </BaseTab>
            </div>

            <div className={"w-full h-full " + (selectedElement ? "" : "hidden")}>
                <BaseTab
                    title={selectedElement?.type ?? "Details"}
                    actionIcon={<XMarkIcon className="w-6" />}
                    onAction={deselectElement}
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
            </div>
        </div>
    );

}
