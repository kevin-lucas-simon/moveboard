import {JointModel} from "../../experience/world/model/JointModel";
import React from "react";
import {ListObjectEditor} from "../ListObjectEditor";
import {BaseTab} from "./BaseTab";
import {PlusIcon} from "@heroicons/react/24/outline";

export type EditJointsTabProps = {
    joints: JointModel[];
    onJointsChange: (joints: JointModel[]) => void;
}

export function EditJointsTab(props: EditJointsTabProps) {
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
        <BaseTab
            title={"Joints"}
            description={"Connect the chunk to other chunks using joints."}
            button={<><PlusIcon className="h-4"/>Add Joint</>}
            onButtonClick={() => null}
        >
            <ul>
                {props.joints.map((joint, index) =>
                    <li key={index} className="flex flex-col divide-gray-500/20">
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
        </BaseTab>
    );
}
