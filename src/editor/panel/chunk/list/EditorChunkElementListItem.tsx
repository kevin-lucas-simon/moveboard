import {BaseVisibilitySlug} from "../../../component/slug/BaseVisibilitySlug";
import {BaseFolderSlug} from "../../../component/slug/BaseFolderSlug";
import {BaseInputSlug} from "../../../component/slug/BaseInputSlug";
import {BaseActionButtonSlug} from "../../../component/slug/BaseActionButtonSlug";
import {LinkIcon, LinkSlashIcon} from "@heroicons/react/24/outline";
import {ElementTypes} from "../../../../data/model/element/ElementTypes";
import {ElementModel} from "../../../../data/model/element/ElementModel";
import {useEditorDispatcher} from "../../../reducer/EditorProvider";
import {GroupModel} from "../../../../data/model/element/system/GroupModel";
import {JointModel} from "../../../../data/model/element/joint/JointModel";
import {BaseActionListSlug} from "../../../component/slug/BaseActionListSlug";

export function EditorChunkElementListItem(element: ElementModel) {
    const dispatcher = useEditorDispatcher()
    if (!dispatcher) {
        return <></>;
    }

    const collapseGroup = () => {
        if (element.type !== ElementTypes.Group) {
            return;
        }

        dispatcher({
            type: 'chunk_patch_element',
            payload: {
                ...element,
                collapsed: !(element as GroupModel).collapsed,
            } as GroupModel,
        })
    }

    const renameElement = (name: string) => {
        dispatcher({
            type: "chunk_patch_element",
            payload: {
                ...element,
                name: name,
            }
        })
    }

    const duplicateElement = () => {
        dispatcher({
            type: 'chunk_duplicate_element',
            payload: element.id,
        });
    }

    const removeElement = () => {
        dispatcher({
            type: 'chunk_remove_element',
            payload: element.id,
        });
    }

    const toggleElementVisibility = () => {
        dispatcher({
            type: 'chunk_set_element_visibility',
            payload: {
                id: element.id,
                hidden: !element.hidden,
            },
        })
    }

    const changeChunk = () => {
        const chunkId = (element as JointModel).neighbour;
        if (!chunkId) {
            return;
        }
        dispatcher({
            type: 'editor_select_structure',
            payload: chunkId,
        });
    }

    return (
        <>
            <BaseVisibilitySlug
                visible={!element.hidden}
                onClick={toggleElementVisibility}
            />
            {element.type === ElementTypes.Group && (
                <BaseFolderSlug
                    collapsed={(element as GroupModel).collapsed}
                    onClick={collapseGroup}
                />
            )}
            <BaseInputSlug
                value={element.name}
                placeholder={element.type}
                onRename={renameElement}
            />

            {element.type === ElementTypes.Joint
                ? <BaseActionButtonSlug onClick={changeChunk}>
                    {(element as JointModel).neighbour
                        ? <LinkIcon className="w-4" />
                        : <LinkSlashIcon className="w-4" />
                    }
                </BaseActionButtonSlug>
                : <BaseActionListSlug options={{
                    "Duplicate": duplicateElement,
                    "Delete": removeElement,
                }} />
            }
        </>
    )
}
