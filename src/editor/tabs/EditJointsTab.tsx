import {JointModel} from "../../model/JointModel";
import React from "react";
import {ListObjectEditor} from "../ListObjectEditor";
import {BaseTab} from "./BaseTab";
import {ChunkReducerActions} from "../reducer/chunkReducer";

export type EditJointsTabProps = {
    joints: JointModel[];
    chunkDispatcher: React.Dispatch<ChunkReducerActions>;
}

export function EditJointsTab(props: EditJointsTabProps) {
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
        >
            <ul>
                {props.joints.map((joint, index) =>
                    <li key={index} className="flex flex-col divide-gray-500/20">
                        <ListObjectEditor
                            key={index}
                            keyName={index.toString()}
                            displayname={joint.neighbour}
                            value={joint}
                            onChange={updateJoint}
                            onDelete={removeJoint}
                        />
                    </li>
                )}
            </ul>
        </BaseTab>
    );
}
