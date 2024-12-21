import {ChunkModel} from "../model/ChunkModel";
import {Vector3, Vector3Like} from "three";
import React from "react";
import {allElements} from "../element/allElements";
import {Joint} from "./Joint";
import {ElementModel} from "../element/ElementModel";
import {JointModel} from "../model/JointModel";

export type ChunkProps = ChunkModel & {
    active: boolean,
    position: Vector3Like,
    onChunkLeave: (neighbour: string) => void,
}
export function Chunk(props: ChunkProps) {
    const createChunkElement = (model: ElementModel) => {
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
                <Joint
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