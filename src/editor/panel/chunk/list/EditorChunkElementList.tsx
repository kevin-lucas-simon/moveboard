import {ElementModel} from "../../../../data/model/element/ElementModel";
import {UUID} from "../../../../data/model/UUID";
import {BaseList} from "../../../component/BaseList";
import {ElementTypes} from "../../../../data/model/element/ElementTypes";
import {GroupModel} from "../../../../data/model/element/system/GroupModel";
import {useEditorDispatcher} from "../../../reducer/EditorProvider";
import React from "react";
import {EditorChunkElementListItem} from "./EditorChunkElementListItem";

export type ChunkElementListProps = {
    elements: {[key: string]: ElementModel};
    selected: UUID[];
}

export function EditorChunkElementList(props: ChunkElementListProps) {
    const dispatcher = useEditorDispatcher();
    if (!dispatcher) {
        return <></>;
    }

    const selectElement = (id: UUID) => {
        if (props.selected.includes(id)) {
            dispatcher({
                type: "editor_deselect_all"
            })
            return;
        }

        dispatcher({
            type: "editor_select_element",
            payload: id,
        });
    }

    const reorderElements = (childIds: UUID[], parentId: UUID | null) => {
        dispatcher({
            type: 'chunk_reorder_elements',
            payload: {
                childIds,
                parentId,
            },
        });
    }

    return (
        <BaseList
            items={Object.values(props.elements)}
            itemContent={element => <EditorChunkElementListItem {...element} />}
            isItemSelected={element => props.selected.includes(element.id)}
            isItemAnExpandedGroup={element => element.type === ElementTypes.Group && !(element as GroupModel).collapsed}
            isParentOfItem={(child, parentId) => child.parent === parentId}
            isItemHidden={child => child.hidden}
            onSelect={selectElement}
            onReorder={reorderElements}
        />
    );
}
