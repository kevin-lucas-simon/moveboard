import {BaseList} from "../../../component/BaseList";
import {useEditorContext, useEditorDispatcher} from "../../../reducer/EditorProvider";
import {StructureTypes} from "../../../../data/model/structure/StructureTypes";
import {UUID} from "../../../../data/model/UUID";
import {StructureID, StructureModel} from "../../../../data/model/structure/StructureModel";
import {BaseInputSlug} from "../../../component/slug/BaseInputSlug";
import {BaseFolderSlug} from "../../../component/slug/BaseFolderSlug";
import {SectionModel} from "../../../../data/model/structure/system/SectionModel";
import {MinusIcon, QuestionMarkCircleIcon, StarIcon, SwatchIcon, TrashIcon} from "@heroicons/react/24/outline";
import React from "react";
import {BaseActionSlug} from "../../../component/slug/BaseActionSlug";

export function StructureList() {
    const editor = useEditorContext()
    const dispatcher = useEditorDispatcher()

    const structureItem = React.useCallback(
        (structure: StructureModel) => <StructureListItem {...structure}/>,
        []
    );

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

    const selectStructure = (id: StructureID) => {
        dispatcher({
            type: 'editor_select_structure',
            payload: id,
        });
    }

    return (
        <BaseList
            items={structures}
            itemContent={structureItem}
            isItemAnExpandedGroup={structure => structure.type === StructureTypes.Section && !(structure as SectionModel).collapsed}
            isItemSelected={structure => structure.id === selectedStructureId}
            isParentOfItem={(child, parentId) => child.parent === parentId}
            onReorder={reorderStructures}
            onSelect={selectStructure}
        />
    );
}

function StructureListItem(structure: StructureModel) {
    const editor = useEditorContext()
    const dispatcher = useEditorDispatcher()
    if (!editor || !dispatcher) {
        return <></>;
    }

    const collapseSection = () => {
        if (structure.type !== StructureTypes.Section) {
            return;
        }

        dispatcher({
            type: 'level_patch_structure',
            payload: {
                id: structure.id,
                collapsed: !(structure as SectionModel).collapsed,
            } as SectionModel,
        })
    }

    const renameStructure = (name: string) => {
        dispatcher({
            type: 'level_patch_structure',
            payload: {
                id: structure.id,
                name: name,
            }
        })
    }

    const removeStructure = () => {
        dispatcher({
            type: 'level_remove_structure',
            payload: structure.id,
        })
    }

    return <>
        {structure.type === StructureTypes.Section && (
            <BaseFolderSlug
                collapsed={(structure as SectionModel).collapsed}
                onCollapseToggle={collapseSection}
            />
        )}
        <StructureListIcon {...structure} />
        <BaseInputSlug
            value={structure.name}
            placeholder={structure.type}
            onRename={renameStructure}
        />
        {editor.level.start === structure.id
            ? <StarIcon className="w-8 p-2"/>
            : <BaseActionSlug onClick={removeStructure}><TrashIcon className="w-4"/></BaseActionSlug>
        }
    </>
}

function StructureListIcon(structure: StructureModel) {
    switch (structure.type) {
        case StructureTypes.Chunk:
            return <MinusIcon className="w-4" />;
        case StructureTypes.Coloring:
            return <SwatchIcon className="w-4" />;
        case StructureTypes.Section:
            return <></>;
        default:
            return <QuestionMarkCircleIcon className="w-4"/>;
    }
}
