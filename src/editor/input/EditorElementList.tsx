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
        // group change is handled by the corresponding group element (two events here)
        if (newFolderElements.length < folderElements.length) {
            return;
        }

        const movedElements = newFolderElements
            .filter(element => !folderElements.some(e => e.id === element.id));
        const movedElementIDs = movedElements
            .map(element => element.id);

        const rootElements = props.parent === null
            ? newFolderElements
            : Object.values(props.elements)
                .filter(element => element.parent === null)
                .filter(element => !movedElementIDs.includes(element.id))
        ;

        const newOrder: ElementID[] = [];
        rootElements.forEach((element) => {
            newOrder.push(element.id);

            // check if folder, than push all children or newly added elements
            if (element.type === ElementType.Group) {
                const folderElements = props.parent === element.id
                    ? newFolderElements
                    : Object.values(props.elements)
                        .filter(e => e.parent === element.id)
                        .filter(e => !movedElementIDs.includes(e.id))
                ;
                folderElements.forEach((child) => {
                    newOrder.push(child.id);

                    // hier fehlt die Folder rekursion
                });
            }
        });

        movedElements.forEach((element) => {
            props.dispatcher({
                type: 'chunk_update_element',
                payload: {
                    ...element,
                    parent: props.parent,
                }
            })
        })

        console.log("Reordering elements in folder", props.parent, newOrder);

        props.dispatcher({
            type: 'chunk_reorder_elements',
            payload: newOrder,
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