import {JointModel} from "../../model/JointModel";
import React from "react";
import {ListObjectEditor} from "../input/ListObjectEditor";
import {BaseTab} from "./BaseTab";
import {ArrowRightIcon, XCircleIcon} from "@heroicons/react/24/outline";
import {LevelReducerActions} from "../reducer/levelReducer";
import {LinkButton} from "../../component/button/LinkButton";
import {ChunkID, ChunkModel} from "../../model/ChunkModel";
import {JointBuilder} from "../../model/builder/JointBuilder";
import {LevelModel} from "../../model/LevelModel";
import {UUID} from "../../model/util/UUID";

export type EditorChunkJointsTabProps = {
    level: LevelModel,
    levelDispatcher: React.Dispatch<LevelReducerActions>;
    activeChunk: ChunkModel;
}

export function EditorChunkJointsTab(props: EditorChunkJointsTabProps) {
    const chunkSelection = {} as {[id: UUID]: string}
    Object.values(props.level.chunks)
        .filter(chunk => chunk.id !== props.activeChunk.id)
        .forEach(chunk => {
            if (Object.values(props.activeChunk.joints).some(joint => joint.neighbour === chunk.id)) {
                return; // skip chunks that are already connected
            }
            chunkSelection[chunk.id] = chunk.name
        })

    const addJoint = () => {
        props.levelDispatcher({
            type: 'chunk_add_joint',
            payload: JointBuilder.create().build(),
        });
    }

    const updateJoint = (index: string, value: JointModel) => {
        props.levelDispatcher({
            type: 'chunk_update_joint',
            payload: value
        });
    }

    const removeJoint = (id: string) => {
        props.levelDispatcher({
            type: 'chunk_remove_joint',
            payload: id,
        });
    }

    const changeChunk = (chunkId: ChunkID|null) => {
        if (!chunkId) {
            return
        }
        props.levelDispatcher({
            type: 'level_select_chunk',
            payload: chunkId,
        });
    }

    return (
        <BaseTab
            title={"Chunk Joints"}
            description={"Connect the chunk to other chunks using joints."}
            onAdd={addJoint}
        >
            <ul>
                {Object.values(props.activeChunk.joints).map((joint, index) =>
                    <li key={joint.id} className="flex flex-col divide-gray-500/20">
                        <ListObjectEditor
                            key={index}
                            keyName={index.toString()}
                            displayname={joint.neighbour ? joint.neighbour : "Joint without Chunk"}
                            value={joint}
                            onChange={updateJoint}
                            selectionOnKey={{
                                "neighbour": chunkSelection,
                            }}
                            actionButton={joint.neighbour ? <ArrowRightIcon className="w-4"/> : undefined}
                            onAction={() => changeChunk(joint.neighbour)}
                        >
                            <li className="mt-2 mx-2">
                                <LinkButton onClick={() => removeJoint(joint.id)}>
                                    <XCircleIcon className="w-4"/>
                                    Remove Joint
                                </LinkButton>
                            </li>
                        </ListObjectEditor>
                    </li>
                )}
            </ul>
        </BaseTab>
    );
}
