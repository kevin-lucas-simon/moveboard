import {ReactSortable} from "react-sortablejs";
import {EditorChunkElementItem} from "./EditorChunkElementItem";
import React from "react";
import {UUID} from "../../../../data/model/UUID";
import {ElementID, ElementModel} from "../../../../data/model/element/ElementModel";
import {GroupModel} from "../../../../data/model/element/system/GroupModel";
import {JointModel} from "../../../../data/model/element/joint/JointModel";
import {ElementTypes} from "../../../../data/model/element/ElementTypes";
import {EditorReducerActions} from "../../../reducer/editorReducer";
import {SortableListService} from "../../../reducer/util/SortableListService";

export type EditorChunkElementListProps = {
    elements: {[key: string]: ElementModel};
    selected: UUID[];
    dispatcher: React.Dispatch<EditorReducerActions>;
    parent: ElementID | null;
}

export function EditorChunkElementList(props: EditorChunkElementListProps) {
    const groupElements = Object.values(props.elements).filter(element => element.parent === props.parent);

    const selectElement = (id: UUID) => {
        if (props.selected.includes(id)) {
            props.dispatcher({
                type: "editor_deselect_all",
            });
            return;
        }
        props.dispatcher({
            type: "editor_select_element",
            payload: id,
        });
    }

    const renameElement = (index: string, name: string) => {
        props.dispatcher({
            type: "chunk_patch_element",
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
            type: 'chunk_patch_element',
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
            type: 'chunk_patch_element',
            payload: {
                ...value,
                collapsed: !(value as GroupModel).collapsed
            } as GroupModel,
        });
    }

    // Info: SortableJS do fire this event on mount for every group instance
    const reorderElements = (newGroupElements: ElementModel[]) => {
        if (!SortableListService.hasItemsBeenMoved(groupElements, newGroupElements)) {
            return;
        }

        const newTotalOrder = SortableListService.calculateMovedGroupOrder(
            Object.values(props.elements),
            groupElements,
            newGroupElements,
            props.parent,
            ElementTypes.Group,
        );

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
            type: 'editor_select_structure',
            payload: chunkId,
        });
    }

    return (
        <ReactSortable
            list={structuredClone(groupElements)} // deep copy to avoid reference issues
            setList={reorderElements}
            tag="ul"
            group={EditorChunkElementList.name}
        >
            {groupElements.map((element) => (
                <EditorChunkElementItem
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
                        <EditorChunkElementList {...props} parent={element.id} />
                    )}
                </EditorChunkElementItem>
            ))}
        </ReactSortable>
    )
}