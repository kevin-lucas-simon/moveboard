import {BaseVisibilitySlug} from "../../../component/slug/BaseVisibilitySlug";
import {BaseFolderSlug} from "../../../component/slug/BaseFolderSlug";
import {BaseInputSlug} from "../../../component/slug/BaseInputSlug";
import {BaseActionSlug} from "../../../component/slug/BaseActionSlug";
import {LinkIcon, LinkSlashIcon, TrashIcon} from "@heroicons/react/24/outline";
import {ElementTypes} from "../../../../data/model/element/ElementTypes";
import {ElementModel} from "../../../../data/model/element/ElementModel";
import {useEditorDispatcher} from "../../../reducer/EditorProvider";
import {GroupModel} from "../../../../data/model/element/system/GroupModel";
import {JointModel} from "../../../../data/model/element/joint/JointModel";

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
                ? <BaseActionSlug onClick={changeChunk}>
                    {(element as JointModel).neighbour
                        ? <LinkIcon className="w-4" />
                        : <LinkSlashIcon className="w-4" />
                    }
                </BaseActionSlug>
                : <BaseActionSlug onClick={removeElement} hide={true}>
                    <TrashIcon className="w-4" />
                </BaseActionSlug>
            }
        </>
    )
}
