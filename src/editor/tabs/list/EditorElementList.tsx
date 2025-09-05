import {ReactSortable} from "react-sortablejs";
import {EditorElementItem} from "./EditorElementItem";
import React from "react";
import {UUID} from "../../../data/model/util/UUID";
import {ElementID, ElementModel} from "../../../data/model/element/ElementModel";
import {EditorChunkElementsTabProps} from "../EditorChunkElementsTab";
import {GroupModel} from "../../../data/model/element/system/GroupModel";
import {JointModel} from "../../../data/model/element/joint/JointModel";
import {ElementTypes} from "../../../data/model/element/ElementTypes";

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

    const renameElement = (index: string, name: string) => {
        props.dispatcher({
            type: "chunk_update_element",
            payload: {
                ...props.elements[index],
                name: name,
            }
        })
    }

    const removeElement = (index: string) => {
        props.dispatcher({
            type: 'chunk_remove_element',
            payload: index as ElementID,
        });
    }

    // toggle the visibility of the element and all children
    const handleVisibility = (index: string, model: ElementModel, value: boolean) => {
        props.dispatcher({
            type: 'chunk_update_element',
            payload: {
                ...model,
                hidden: value,
            },
        });

        const groupChildren = Object.values(props.elements).filter(element => element.parent === model.id)
        groupChildren.forEach((child) => {
            handleVisibility(child.id, child, value);
        })
    }

    const toggleCollapse = (index: string, value: ElementModel) => {
        if (value.type !== ElementTypes.Group) {
            return;
        }

        props.dispatcher({
            type: 'chunk_update_element',
            payload: {
                ...value,
                collapsed: !(value as GroupModel).collapsed
            } as GroupModel,
        });
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
                    ...props.elements[element.id], // keep the old element data, do not thrust the new one
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

                if (element.type === ElementTypes.Group) {
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

    const changeChunk = (id: ElementID) => {
        const chunkId = (props.elements[id] as JointModel).neighbour;
        if (!chunkId) {
            return;
        }
        props.dispatcher({
            type: 'level_select_structure',
            payload: chunkId,
        });
    }

    return (
        <ReactSortable
            list={structuredClone(groupElements)} // deep copy to avoid reference issues
            setList={reorderElements}
            tag="ul"
            group={EditorElementList.name}
        >
            {groupElements.map((element) => (
                <EditorElementItem
                    key={element.id}
                    element={element}
                    selected={props.selected.includes(element.id)}
                    onSelect={selectElement}
                    onRename={renameElement}
                    onRemove={removeElement}
                    onChunkChange={changeChunk}
                    onHideToggle={(id) => handleVisibility(id, element, !element.hidden)}
                    onCollapseToggle={(id) => toggleCollapse(id, element)}
                >
                    {element.type === ElementTypes.Group && (
                        <EditorElementList {...props} parent={element.id} />
                    )}
                </EditorElementItem>
            ))}
        </ReactSortable>
    )
}