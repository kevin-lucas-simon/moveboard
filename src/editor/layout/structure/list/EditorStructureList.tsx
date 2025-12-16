import {BaseList} from "../../../component/BaseList";
import {useEditorContext, useEditorDispatcher} from "../../../reducer/EditorProvider";
import {StructureTypes} from "../../../../data/model/structure/StructureTypes";
import {UUID} from "../../../../data/model/UUID";
import {StructureID} from "../../../../data/model/structure/StructureModel";
import {SectionModel} from "../../../../data/model/structure/system/SectionModel";
import React from "react";
import {EditorStructureListItem} from "./EditorStructureListItem";

export function EditorStructureList() {
    const editor = useEditorContext()
    const dispatcher = useEditorDispatcher()
    if (!editor || !dispatcher) {
        return <></>;
    }

    const structures = Object.values(editor.level.structures);
    const selectedStructureId = editor.selectedStructure;

    const reorderStructures = (childIds: UUID[], parentId: UUID|null) => {
        dispatcher({
            type: 'level_reorder_structures',
            payload: {
                parentId: parentId,
                childIds: childIds,
            },
        })
    }

    const selectStructure = (id: StructureID) => {
        dispatcher({
            type: 'editor_select_structure',
            payload: id,
        });
    }

    return (
        <BaseList
            items={structures}
            itemContent={structure => <EditorStructureListItem {...structure}/>}
            isItemAnExpandedGroup={structure => structure.type === StructureTypes.Section && !(structure as SectionModel).collapsed}
            isItemSelected={structure => structure.id === selectedStructureId}
            isParentOfItem={(child, parentId) => child.parent === parentId}
            onReorder={reorderStructures}
            onSelect={selectStructure}
        />
    );
}
