import {JointModel} from "../../model/JointModel";
import React from "react";
import {ListObjectEditor} from "../input/ListObjectEditor";
import {BaseTab} from "./BaseTab";
import {ArrowRightIcon, XCircleIcon} from "@heroicons/react/24/outline";
import {LevelReducerActions} from "../reducer/levelReducer";
import {LinkButton} from "../../component/button/LinkButton";
import {ChunkID} from "../../model/ChunkModel";
import {JointBuilder} from "../../model/builder/JointBuilder";

export type EditorChunkJointsTabProps = {
    joints: {[key: string]: JointModel};
    currentChunk: string;
    chunkNames: string[];
    levelDispatcher: React.Dispatch<LevelReducerActions>;
}

export function EditorChunkJointsTab(props: EditorChunkJointsTabProps) {
    const validChunksForNewJoints = props.chunkNames
        // .filter((chunkName) => !props.joints.some((joint) => joint.neighbour === chunkName)) // TODO
        .filter((chunkName) => chunkName !== props.currentChunk)
    ;

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
                {Object.values(props.joints).map((joint, index) =>
                    <li key={props.currentChunk + index} className="flex flex-col divide-gray-500/20">
                        <ListObjectEditor
                            key={index}
                            keyName={index.toString()}
                            displayname={joint.neighbour ? joint.neighbour : "Joint without Chunk"}
                            value={joint}
                            onChange={updateJoint}
                            selectionOnKey={{
                                "neighbour": validChunksForNewJoints,
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
