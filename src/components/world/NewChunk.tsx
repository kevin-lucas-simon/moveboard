import {NewChunkModel} from "../model/NewChunkModel";
import {Vector3, Vector3Like} from "three";
import React from "react";
import {allElements} from "../element/allElements";
import {JointModel} from "../chunks/model/JointModel";
import {NewJoint} from "./NewJoint";
import {NewElementModel} from "../element/NewElementModel";

export type NewChunkProps = NewChunkModel & {
    active: boolean,
    position: Vector3Like,
    onChunkLeave: (neighbour: string) => void,
}
export function NewChunk(props: NewChunkProps) {
    const createChunkElement = (model: NewElementModel) => {
        const position = new Vector3()
            .copy(props.position)
            .add(model.position)
        ;
        const component = allElements[model.type] ?? allElements.default;
        return React.createElement(component, {...model, position});
    }

    return (
        <>
            {props.elements.map((element) => createChunkElement(element))}
            {props.joints.map((joint: JointModel) =>
                <NewJoint
                    {...joint}
                    key={props.name+"->"+joint.neighbour}
                    inActiveChunk={props.active}
                    position={new Vector3().copy(props.position).add(joint.position)}
                    chunkPosition={new Vector3().copy(props.position)}
                    onChunkLeave={props.onChunkLeave}
                />
            )}
        </>
    );
}