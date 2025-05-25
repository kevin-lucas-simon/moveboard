import {JointModel} from "../../model/JointModel";
import React from "react";
import {ListObjectEditor} from "../input/ListObjectEditor";
import {BaseTab} from "./BaseTab";
import {ArrowRightCircleIcon} from "@heroicons/react/24/outline";
import {LevelReducerActions} from "../reducer/levelReducer";

export type EditJointsTabProps = {
    joints: JointModel[];
    currentChunk: string;
    chunkNames: string[];
    levelDispatcher: React.Dispatch<LevelReducerActions>;
}

export function EditJointsTab(props: EditJointsTabProps) {
    const validChunksForNewJoints = props.chunkNames
        .filter((chunkName) => !props.joints.some((joint) => joint.neighbour === chunkName))
        .filter((chunkName) => chunkName !== props.currentChunk)
    ;

    const addJoint = () => {
        props.levelDispatcher({
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
        props.levelDispatcher({
            type: 'chunk_update_joint',
            payload: {
                index: index,
                joint: value,
            }
        });
    }

    const removeJoint = (index: string) => {
        props.levelDispatcher({
            type: 'chunk_remove_joint',
            payload: index,
        });
    }

    const changeChunk = (index: string) => {
        props.levelDispatcher({
            type: 'level_select_chunk',
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
                        >
                            {/* TODO swap current delete button with new "Action" button which is here the change chunk badge */}
                            {/* TODO in addition we can add clone and hide functionality here */}
                            {/* TODO display which element is currently selected in 3D engine*/}

                            <li className="mt-2 mx-2">
                                {joint.neighbour &&
                                    <button
                                        className="flex gap-1 px-2 py-1 hover:bg-gray-500/10 rounded-full text-sm"
                                        onClick={() => changeChunk(joint.neighbour)}
                                    >
                                        <ArrowRightCircleIcon className="w-4"/>
                                        Change Chunk
                                    </button>
                                }
                            </li>
                        </ListObjectEditor>
                    </li>
                )}
            </ul>
        </BaseTab>
    );
}
