import {JointModel} from "../../experience/world/model/JointModel";
import React from "react";
import {ListObjectEditor} from "../ListObjectEditor";

export type ChunkJointsEditorProps = {
    joints: JointModel[];
    onJointsChange: (joints: JointModel[]) => void;
}

export function EditorJointsTab(props: ChunkJointsEditorProps) {
    const handleChangedJoint = (index: string, value: JointModel) => { // TODO index ist unschön
        props.onJointsChange(
            props.joints.map((el, i) => i !== parseInt(index) ? el : value)
        );
    }

    const handleRemovedJoint = (index: string) => {
        props.onJointsChange(
            props.joints.filter((e, i) => i !== parseInt(index))
        );
    }

    return (
        <div className="w-full h-full flex flex-col">
            <h2 className="text-xl pt-4 px-4">Joints</h2>
            <div className="grow h-0 overflow-y-auto">
                <p className="text-sm px-4 py-2">
                    Connect the chunk to other chunks using joints.
                </p>
                <ul>
                    {props.joints.map((joint, index) =>
                        <li className="flex flex-col divide-gray-500/20">
                            <ListObjectEditor
                                key={index}
                                keyName={index.toString()}
                                displayname={joint.neighbour}
                                value={joint}
                                onChange={handleChangedJoint}
                                onDelete={handleRemovedJoint}
                            />
                        </li>
                    )}
                </ul>
            </div>
            {/* TODO duplicated Button! JsonObjectAdd? */}
            {/* TODO add joint function is missing */}
            <button
                className="flex w-full hover:bg-gray-500/10 px-4 py-2 gap-1 border-t border-gray-500/10"
                onClick={() => null}
            >
                <span className="w-4 text-left">&#43;</span>
                <span>Add Joint</span>
            </button>
        </div>
    );
}
