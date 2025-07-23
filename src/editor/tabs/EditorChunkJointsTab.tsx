import {createJoint, JointModel} from "../../data/model/world/JointModel";
import React from "react";
import {ListObjectEditor} from "../input/ListObjectEditor";
import {BaseTab} from "./BaseTab";
import {ArrowRightIcon, XCircleIcon} from "@heroicons/react/24/outline";
import {LevelReducerActions} from "../reducer/levelReducer";
import {LinkButton} from "../../component/button/LinkButton";
import {ChunkID, ChunkModel} from "../../data/model/world/ChunkModel";
import {LevelModel} from "../../data/model/world/LevelModel";
import {UUID} from "../../data/model/shared/UUID";

export type EditorChunkJointsTabProps = {
    level: LevelModel,
    levelDispatcher: React.Dispatch<LevelReducerActions>;
    activeChunk: ChunkModel;
}

export function EditorChunkJointsTab(props: EditorChunkJointsTabProps) {
    const addJoint = () => {
        props.levelDispatcher({
            type: 'chunk_add_joint',
            payload: createJoint(),
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

    const getChunkSelection = (jointNeighbour: ChunkID|null): {[id: UUID]: string} => {
        // populate the selection with all chunks except the active chunk
        const chunkSelection = {} as {[id: UUID]: string};
        Object.values(props.level.chunks)
            .filter(chunk => chunk.id !== props.activeChunk.id)
            .forEach(chunk => {
                // skip chunks that are already connected
                if (Object.values(props.activeChunk.joints).some(joint => joint.neighbour === chunk.id)) {
                    return;
                }
                chunkSelection[chunk.id] = chunk.name;
            });

        // if a joint neighbour is specified as value, ensure it is included in the selection (display name)
        if (jointNeighbour) {
            chunkSelection[jointNeighbour] = props.level.chunks[jointNeighbour].name;
        }
        return chunkSelection;
    };

    return (
        <BaseTab
            title={"Chunk Joints"}
            description={"Connect the chunk to other chunks using joints."}
            onAction={addJoint}
        >
            <ul>
                {Object.values(props.activeChunk.joints).map((joint, index) =>
                    <li key={joint.id} className="flex flex-col divide-gray-500/20">
                        <ListObjectEditor
                            key={index}
                            keyName={index.toString()}
                            displayname={joint.neighbour ? props.level.chunks[joint.neighbour].name : "Joint without Chunk"}
                            value={joint}
                            onChange={updateJoint}
                            selectionOnKey={{
                                "neighbour": getChunkSelection(joint.neighbour)
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
