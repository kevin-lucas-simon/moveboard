import React from "react";
import {BaseTab} from "../../component/BaseTab";
import {JsonObjectEditor} from "../../component/input/JsonObjectEditor";
import {LevelModel} from "../../../data/model/world/LevelModel";
import {JointModel} from "../../../data/model/element/joint/JointModel";
import {EditorJointSlug} from "../list/element/slug/EditorJointSlug";
import {EditorReducerActions} from "../../reducer/editorReducer";
import {PencilIcon, PlusCircleIcon, StarIcon, TrashIcon} from "@heroicons/react/24/outline";
import {LinkButton} from "../../../component/button/LinkButton";
import {ElementTypes} from "../../../data/model/element/ElementTypes";
import {createElement} from "../../../data/factory/ElementFactory";
import {ChunkID, ChunkModel} from "../../../data/model/structure/spacial/ChunkModel";

export type EditorChunkInspectorProps = {
    level: LevelModel;
    chunk: ChunkModel;
    dispatcher: React.Dispatch<EditorReducerActions>;
}

export function EditorChunkInspector(props: EditorChunkInspectorProps) {
    const joints = Object.values(props.chunk.elements).filter(element => element.type === ElementTypes.Joint) as JointModel[];
    const isStart = props.level.start === props.chunk.id;

    const updateField = (key: string, value: any) => {
        props.dispatcher({
            type: 'chunk_update_field',
            payload: {
                key: key as keyof ChunkModel,
                value: value,
            }
        })
    }

    const changeChunk = (chunkId: ChunkID|null) => {
        if (!chunkId) {
            return
        }
        props.dispatcher({
            type: 'editor_select_structure',
            payload: chunkId,
        });
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

    const selectJoint = (e: any, joint: JointModel) => {
        e.stopPropagation();
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
        props.dispatcher({
            type: "editor_select_element",
            payload: element.id,
        });
    }

    const renameJoint = (name: string, joint: JointModel) => {
        props.dispatcher({
            type: 'chunk_update_element',
            payload: {
                ...joint,
                name: name,
            }
        });
    }

    return (
        <BaseTab title={props.chunk.name}>
            {isStart &&
                <small className="flex gap-1 px-4">
                    <StarIcon className="w-4"/>
                    Level Start
                </small>
            }
            <ul className="mt-2">
                {Object.entries(props.chunk)
                    .filter(([key, _]) => !['elements', 'joints'].includes(key))
                    .map(([key, value]) => {
                        return (
                            <JsonObjectEditor key={key} keyName={key} value={value} onChange={updateField}/>
                        )
                    })
                }
                <li className="w-full hover:bg-gray-500/10 py-2 cursor-pointer">
                    <span className="px-4">Joints</span>
                    <ul className="mt-1">
                        {joints.map((joint) =>
                            <li
                                key={joint.id}
                                className="flex gap-2 px-4 py-1.5 hover:bg-gray-500/10 group"
                            >
                                <EditorJointSlug
                                    key={joint.id}
                                    element={joint}
                                    onChunkChange={() => changeChunk(joint.neighbour)}
                                    onRename={(name) => renameJoint(name, joint)}
                                />
                                <div className="grow"/>
                                <button
                                    onClick={(e: any) => selectJoint(e, joint)}
                                    className="p-2 -mx-2 -my-1 rounded-full hidden group-hover:block hover:bg-gray-500/10"
                                >
                                    <PencilIcon className="w-4"/>
                                </button>
                            </li>
                        )}
                        <li className="px-2 py-1">
                            <LinkButton onClick={createJoint}>
                                <PlusCircleIcon className="w-4"/>
                                Create Joint
                            </LinkButton>
                        </li>
                    </ul>
                </li>

                {!isStart &&
                    <li className="w-full hover:bg-gray-500/10 px-2 py-2 cursor-pointer">
                        <span className="px-2">Actions</span>
                        <LinkButton onClick={updateChunkAsLevelStart}>
                            <StarIcon className="w-4"/>
                            Set as Start Chunk
                        </LinkButton>
                        <LinkButton onClick={removeChunk}>
                            <TrashIcon className="w-4"/>
                            Remove Chunk
                        </LinkButton>
                    </li>
                }
            </ul>
        </BaseTab>
    );
}
