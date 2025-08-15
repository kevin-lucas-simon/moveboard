import {ChunkID, ChunkModel} from "../../data/model/world/ChunkModel";
import React from "react";
import {LevelReducerActions} from "../reducer/levelReducer";
import {BaseTab} from "../component/BaseTab";
import {JsonObjectEditor} from "../input/JsonObjectEditor";
import {LevelModel} from "../../data/model/world/LevelModel";
import {ElementType} from "../../data/model/element/ElementType";
import {JointModel} from "../../data/model/element/joint/JointModel";
import {LinkIcon, LinkSlashIcon} from "@heroicons/react/24/outline";

export type EditorChunkInspectorProps = {
    level: LevelModel;
    chunk: ChunkModel;
    dispatcher: React.Dispatch<LevelReducerActions>;
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
                <li className="w-full hover:bg-gray-500/10 px-4 py-2">
                    Joints
                    <ul className="mt-2">
                        {joints.map((joint) =>
                            <li key={joint.id} className="grow flex gap-2 py-1">
                                <button
                                    onClick={() => changeChunk(joint.neighbour)}
                                    className="p-2 -mx-2 -my-1 rounded-full hover:bg-gray-500/10"
                                >
                                    {joint.neighbour
                                        ? <LinkIcon className="w-4"/>
                                        : <LinkSlashIcon className="w-4" />
                                    }
                                </button>
                                <span>
                                    {props.level.chunks[joint.neighbour ?? "000-000"]?.name || "Joint without Chunk"}
                                </span>
                            </li>
                        )}
                    </ul>
                </li>
            </ul>
        </BaseTab>
    );
}
