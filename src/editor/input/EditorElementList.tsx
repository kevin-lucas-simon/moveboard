import {ReactSortable} from "react-sortablejs";
import {EditorElementItem} from "./EditorElementItem";
import React from "react";
import {UUID} from "../../data/model/shared/UUID";
import {ElementID, ElementModel} from "../../data/model/element/ElementModel";
import {EditorChunkElementsTabProps} from "../tabs/EditorChunkElementsTab";
import {ElementType} from "../../data/model/element/ElementType";

export type EditorElementListProps = EditorChunkElementsTabProps & {
    parent: ElementID | null;
}

export function EditorElementList(props: EditorElementListProps) {
    const folderElements = Object.values(props.elements).filter(element => element.parent === props.parent);

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

    const removeElement = (index: string) => {
        props.dispatcher({
            type: 'chunk_remove_element',
            payload: index as ElementID,
        });
    }

    const toggleElementVisibility = (index: string, value: ElementModel) => {
        props.dispatcher({
            type: 'chunk_update_element',
            payload: {
                ...value,
                hidden: !(value.hidden ?? false)
            },
        });
    }

    const reorderElements = (newFolderElements: ElementModel[]) => {
        // group change is handled by the corresponding group element
        if (newFolderElements.length < folderElements.length) {
            return;
        }

        const newFolderOrder: ElementID[] = [];
        newFolderElements.forEach((element) => {
            newFolderOrder.push(element.id);

            if (!folderElements.some(e => e.id === element.id)) {
                props.dispatcher({
                    type: 'chunk_update_element',
                    payload: {
                        ...element,
                        parent: props.parent,
                    }
                })
            }
        });

        const otherElements = Object.values(props.elements)
            .filter(element => element.parent !== props.parent || props.parent === null);

        const newGlobalOrder: ElementID[] = [];
        otherElements.forEach((element) => {
            newGlobalOrder.push(element.id);

            if (element.id === props.parent) {
                newGlobalOrder.push(...newFolderOrder); // TODO sauber ist das nicht, weil noch doppelte IDs drin sein können
            }
        });

        console.log("Reordering elements:", newGlobalOrder);

        props.dispatcher({
            type: 'chunk_reorder_elements',
            payload: newGlobalOrder,
        })
    }

    return (
        <ReactSortable
            list={folderElements}
            setList={reorderElements}
            tag="ul"
            group={EditorElementList.name}
        >
            {folderElements.map((element) => (
                <EditorElementItem
                    key={element.id}
                    id={element.id}
                    display={element.type}
                    hidden={element.hidden}
                    isSelected={props.selected.includes(element.id)}
                    isGroup={element.type === ElementType.Group}
                    hasParent={element.parent !== null}
                    onSelect={selectElement}
                    onRemove={removeElement}
                    toggleHide={(id) => toggleElementVisibility(id, element)}
                >
                    {/* TODO evtl hier irgendwann ein collapse bauen */}
                    {element.type === ElementType.Group && (
                        <EditorElementList {...props} parent={element.id} />
                    )}
                </EditorElementItem>
            ))}
        </ReactSortable>
    )
}