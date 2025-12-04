import {BaseList} from "../../../component/BaseList";
import {useEditorContext, useEditorDispatcher} from "../../../reducer/EditorProvider";
import {StructureTypes} from "../../../../data/model/structure/StructureTypes";
import {UUID} from "../../../../data/model/UUID";

export function StructureList() {
    const editor = useEditorContext()
    const dispatcher = useEditorDispatcher()
    if (!editor || !dispatcher) {
        return <></>;
    }

    const structures = Object.values(editor.level.structures);
    const selectedStructureId = editor.selectedStructure;

    const reorderStructures = (structureIds: UUID[], parentIds: UUID|null) => {
        dispatcher({
            type: 'level_reorder_structures',
            payload: {
                parentId: parentIds,
                childIds: structureIds,
            },
        })
    }

    return (
        <BaseList
            items={structures}
            itemContent={structure => (
                <div>{structure.name}</div>
            )}
            isItemAGroup={structure => structure.type === StructureTypes.Section}
            isItemSelected={structure => structure.id === selectedStructureId}
            isParentOfItem={(child, parentId) => child.parent === parentId}
            onReorder={reorderStructures}
        />
    );
}