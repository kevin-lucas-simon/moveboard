import {StructureModel} from "../../../../data/model/structure/StructureModel";
import {useEditorContext, useEditorDispatcher} from "../../../reducer/EditorProvider";
import {StructureTypes} from "../../../../data/model/structure/StructureTypes";
import {SectionModel} from "../../../../data/model/structure/system/SectionModel";
import {BaseFolderSlug} from "../../../component/slug/BaseFolderSlug";
import {EditorStructureListIcon} from "./EditorStructureListIcon";
import {BaseInputSlug} from "../../../component/slug/BaseInputSlug";
import {StarIcon, TrashIcon} from "@heroicons/react/24/outline";
import {BaseActionSlug} from "../../../component/slug/BaseActionSlug";
import React from "react";

export function EditorStructureListItem(structure: StructureModel) {
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
                onClick={collapseSection}
            />
        )}
        <EditorStructureListIcon {...structure} />
        <BaseInputSlug
            value={structure.name}
            placeholder={structure.type}
            onRename={renameStructure}
        />
        {editor.level.start === structure.id
            ? <StarIcon className="w-8 p-2"/>
            : <BaseActionSlug onClick={removeStructure} hide={true}>
                <TrashIcon className="w-4"/>
              </BaseActionSlug>
        }
    </>
}