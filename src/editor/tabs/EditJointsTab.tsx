import {JointModel} from "../../model/JointModel";
import React from "react";
import {ListObjectEditor} from "../input/ListObjectEditor";
import {BaseTab} from "./BaseTab";
import {ChunkReducerActions} from "../reducer/chunkReducer";

export type EditJointsTabProps = {
    joints: JointModel[];
    currentChunk: string;
    chunkNames: string[];
    chunkDispatcher: React.Dispatch<ChunkReducerActions>;
}

export function EditJointsTab(props: EditJointsTabProps) {
    const validChunksForNewJoints = props.chunkNames
        .filter((chunkName) => !props.joints.some((joint) => joint.neighbour === chunkName))
        .filter((chunkName) => chunkName !== props.currentChunk)
    ;

    const addJoint = () => {
        props.chunkDispatcher({
            type: 'chunk_add_joint',
            payload: {
                neighbour: "",
                position: {x: 0, y: 1, z: 0},
                dimension: {x: 1, y: 1, z: 1},
                vision: 1,
            } as JointModel,
        });
    }

    const updateJoint = (index: string, value: JointModel) => {
        props.chunkDispatcher({
            type: 'chunk_update_joint',
            payload: {
                index: index,
                joint: value,
            }
        });
    }

    const removeJoint = (index: string) => {
        props.chunkDispatcher({
            type: 'chunk_remove_joint',
            payload: index,
        });
    }

    return (
        <BaseTab
            title={"Joints"}
            description={"Connect the chunk to other chunks using joints."}
            onAdd={addJoint}
        >
            <ul>
                {props.joints.map((joint, index) =>
                    <li key={index} className="flex flex-col divide-gray-500/20">
                        <ListObjectEditor
                            key={index}
                            keyName={index.toString()}
                            displayname={joint.neighbour ? joint.neighbour : "Joint without Chunk"}
                            value={joint}
                            onChange={updateJoint}
                            onDelete={removeJoint}
                            selectionOnKey={{
                                "neighbour": validChunksForNewJoints,
                            }}
                        />
                    </li>
                )}
            </ul>
        </BaseTab>
    );
}
