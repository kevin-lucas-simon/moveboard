import React from "react";
import {BasePanel} from "../../../component/BasePanel";
import {LevelModel} from "../../../../data/model/world/LevelModel";
import {JointModel} from "../../../../data/model/element/joint/JointModel";
import {EditorReducerActions} from "../../../reducer/editorReducer";
import {LinkIcon, LinkSlashIcon, PlusCircleIcon, StarIcon, TrashIcon} from "@heroicons/react/24/outline";
import {ElementTypes} from "../../../../data/model/element/ElementTypes";
import {createElement} from "../../../../data/factory/ElementFactory";
import {ChunkDefault, ChunkID, ChunkModel} from "../../../../data/model/structure/spacial/ChunkModel";
import {EditorForm} from "../../../form/EditorForm";
import {BaseInputSlug} from "../../../component/slug/BaseInputSlug";
import {BaseActionSlug} from "../../../component/slug/BaseActionSlug";
import {BaseListItem} from "../../../component/BaseListItem";

export type EditorChunkGeneralInspectorProps = {
    level: LevelModel;
    chunk: ChunkModel;
    dispatcher: React.Dispatch<EditorReducerActions>;
}

export function EditorChunkGeneralInspector(props: EditorChunkGeneralInspectorProps) {
    const joints = Object.values(props.chunk.elements).filter(element => element.type === ElementTypes.Joint) as JointModel[];
    const isStart = props.level.start === props.chunk.id;

    const changeChunk = (chunkId: ChunkID | null) => {
        if (!chunkId) {
            return
        }
        props.dispatcher({
            type: 'editor_select_structure',
            payload: chunkId,
        });
    }

    const updateChunk = (chunk: ChunkModel) => {
        props.dispatcher({
            type: 'level_patch_structure',
            payload: chunk,
        })
    }

    const updateChunkAsLevelStart = () => {
        props.dispatcher({
            type: 'level_update_field',
            payload: {
                key: 'start',
                value: props.chunk.id,
            }
        });
    }

    const removeChunk = () => {
        props.dispatcher({
            type: 'level_remove_structure',
            payload: props.chunk.id,
        });
    }

    const selectJoint = (joint: JointModel) => {
        props.dispatcher({
            type: 'editor_select_element',
            payload: joint.id,
        });
    }

    const createJoint = () => {
        const element = createElement(ElementTypes.Joint) as JointModel;
        props.dispatcher({
            type: "chunk_add_element",
            payload: element,
        })
    }

    return (
        <BasePanel title={"General"}>
            <EditorForm
                itemValue={props.chunk}
                itemDefault={ChunkDefault}
                onChange={updateChunk}
                hiddenKeys={['elements']}
                additionalEntries={{
                    "Joints": <>
                        {joints.map((joint) =>
                            <BaseListItem
                                key={joint.id}
                                onClick={() => selectJoint(joint)}
                            >
                                <BaseInputSlug
                                    value={joint.name || joint.type}
                                    placeholder={joint.type}
                                    onRename={() => {}}
                                />
                                <BaseActionSlug onClick={() => changeChunk(joint.neighbour)}>
                                    {joint.neighbour
                                        ? <LinkIcon className="w-4" />
                                        : <LinkSlashIcon className="w-4" />
                                    }
                                </BaseActionSlug>
                            </BaseListItem>
                        )}
                        {joints.length === 0 &&
                            <BaseListItem>
                                No joints
                            </BaseListItem>}
                    </>,
                    "Actions": <>
                        <BaseListItem onClick={createJoint}>
                            <PlusCircleIcon className="w-4"/>
                            Create Joint
                        </BaseListItem>
                        {!isStart && <>
                            <BaseListItem onClick={updateChunkAsLevelStart}>
                                <StarIcon className="w-4"/>
                                Set as Start Chunk
                            </BaseListItem>
                            <BaseListItem onClick={removeChunk}>
                                <TrashIcon className="w-4"/>
                                Remove Chunk
                            </BaseListItem>
                        </>}
                    </>,
                }}
            />
        </BasePanel>
    );
}