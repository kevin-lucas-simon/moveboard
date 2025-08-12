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
    const groupElements = Object.values(props.elements).filter(element => element.parent === props.parent);

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

    // toggle the visibility of the element and all children
    const toggleVisibility = (index: string, value: ElementModel) => {
        props.dispatcher({
            type: 'chunk_update_element',
            payload: {
                ...value,
                hidden: !(value.hidden ?? false)
            },
        });

        const groupChildren = Object.values(props.elements).filter(element => element.parent === value.id)
        groupChildren.forEach((child) => {
            toggleVisibility(child.id, child);
        })
    }

    // Info: SortableJS do fire this event on mount for every group instance
    const reorderElements = (newGroupElements: ElementModel[]) => {
        // group change is only handled by the corresponding group element (two events on moving between groups)
        if (newGroupElements.length < groupElements.length) {
            return;
        }

        // update the parent of the moved elements
        const movedElements = newGroupElements.filter(element => !groupElements.some(e => e.id === element.id));
        movedElements.forEach((element) => {
            props.dispatcher({
                type: 'chunk_update_element',
                payload: {
                    ...element,
                    parent: props.parent,
                }
            })
        })

        // recursively calculate the new total order of elements (we have to remove the old one)
        const calculateGroupOrder = (parent: ElementID|null): ElementID[] => {
            const groupElements = props.parent === parent
                ? newGroupElements
                : Object.values(props.elements)
                    .filter(element => element.parent === parent)
                    .filter(element => !movedElements.map(element => element.id).includes(element.id))
            ;

            const newGroupOrder: ElementID[] = [];
            groupElements.forEach((element) => {
                newGroupOrder.push(element.id);

                if (element.type === ElementType.Group) {
                    const childrenOrder = calculateGroupOrder(element.id);
                    newGroupOrder.push(...childrenOrder);
                }
            })

            return newGroupOrder;
        }

        // apply the new order to the chunk
        const newTotalOrder: ElementID[] = calculateGroupOrder(null);
        props.dispatcher({
            type: 'chunk_reorder_elements',
            payload: newTotalOrder,
        })
    }

    return (
        <ReactSortable
            list={groupElements}
            setList={reorderElements}
            tag="ul"
            group={EditorElementList.name}
        >
            {groupElements.map((element) => (
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
                    toggleHide={(id) => toggleVisibility(id, element)}
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