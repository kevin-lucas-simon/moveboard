import React from "react";
import {BasePanel} from "../../../component/BasePanel";
import {LevelModel} from "../../../../data/model/world/LevelModel";
import {JointModel} from "../../../../data/model/element/joint/JointModel";
import {EditorReducerActions} from "../../../reducer/editorReducer";
import {LinkIcon, LinkSlashIcon, PlusCircleIcon, StarIcon, TrashIcon} from "@heroicons/react/24/outline";
import {LinkButton} from "../../../../component/button/LinkButton";
import {ElementTypes} from "../../../../data/model/element/ElementTypes";
import {createElement} from "../../../../data/factory/ElementFactory";
import {ChunkDefault, ChunkID, ChunkModel} from "../../../../data/model/structure/spacial/ChunkModel";
import {EditorForm} from "../../../form/EditorForm";

export type EditorChunkGeneralInspectorProps = {
    level: LevelModel;
    chunk: ChunkModel;
    dispatcher: React.Dispatch<EditorReducerActions>;
}

export function EditorChunkGeneralInspector(props: EditorChunkGeneralInspectorProps) {
    const joints = Object.values(props.chunk.elements).filter(element => element.type === ElementTypes.Joint) as JointModel[];
    const isStart = props.level.start === props.chunk.id;

    const changeChunk = (chunkId: ChunkID|null) => {
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

    return (
        <BasePanel title={"General"} description={isStart ? "Level Start" : undefined}>
            <EditorForm
                itemValue={props.chunk}
                itemDefault={ChunkDefault}
                hiddenKeys={['elements']}
                onChange={updateChunk}
            />

            <ul className="mt-2">
                <li className="w-full hover:bg-gray-500/10 py-2 cursor-pointer">
                    <span className="px-4">Joints</span>
                    <ul className="mt-1">
                        {joints.map((joint) =>
                            <li
                                key={joint.id}
                                className="flex gap-2 px-4 py-1.5 hover:bg-gray-500/10 group"
                                onClick={(e: any) => selectJoint(e, joint)}
                            >
                                <button
                                    onClick={() => joint.neighbour ? changeChunk(joint.neighbour) : undefined}
                                    className="p-2 -mx-2 -my-1 rounded-full hover:bg-gray-500/10"
                                >
                                    {joint.neighbour
                                        ? <LinkIcon className="w-4" />
                                        : <LinkSlashIcon className="w-4" />
                                    }
                                </button>
                                {joint.name || joint.type}
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
        </BasePanel>
    );
}
