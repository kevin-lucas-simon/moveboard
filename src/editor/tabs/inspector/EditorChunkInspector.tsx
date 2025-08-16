import {ChunkID, ChunkModel} from "../../../data/model/world/ChunkModel";
import React from "react";
import {BaseTab} from "../../component/BaseTab";
import {JsonObjectEditor} from "../../component/input/JsonObjectEditor";
import {LevelModel} from "../../../data/model/world/LevelModel";
import {ElementType} from "../../../data/model/element/ElementType";
import {JointModel} from "../../../data/model/element/joint/JointModel";
import {EditorJointSlug} from "../slug/EditorJointSlug";
import {EditorReducerActions} from "../../reducer/editorReducer";
import {PencilIcon} from "@heroicons/react/24/outline";

export type EditorChunkInspectorProps = {
    level: LevelModel;
    chunk: ChunkModel;
    dispatcher: React.Dispatch<EditorReducerActions>;
}

export function EditorChunkInspector(props: EditorChunkInspectorProps) {
    const joints = Object.values(props.chunk.elements).filter(element => element.type === ElementType.Joint) as JointModel[];

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
            type: 'level_select_chunk',
            payload: chunkId,
        });
    }

    const selectJoint = (e: any, joint: JointModel) => {
        e.stopPropagation();
        props.dispatcher({
            type: 'editor_select',
            payload: joint.id,
        });
    }

    return (
        <BaseTab title={props.chunk.name}>
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
                    <ul className="mt-2">
                        {joints.map((joint) =>
                            <li
                                key={joint.id}
                                className="grow flex gap-2 px-4 py-1.5 hover:bg-gray-500/10 group"
                                onClick={() => changeChunk(joint.neighbour)}
                            >
                                <EditorJointSlug
                                    key={joint.id}
                                    element={joint}
                                    onChunkChange={() => changeChunk(joint.neighbour)}
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
                    </ul>
                </li>
            </ul>
        </BaseTab>
    );
}
