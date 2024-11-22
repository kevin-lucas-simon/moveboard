import {NewChunkModel} from "../model/NewChunkModel";
import {Vector3, Vector3Like} from "three";
import React from "react";
import {allElements} from "../element/allElements";
import {NewElementModel} from "../element/NewElementModel";

export type NewChunkProps = NewChunkModel & {
    position: Vector3Like,
}
export function NewChunk(props: NewChunkProps) {
    const createChunkElement = (element: NewElementModel) => {
        const position = new Vector3()
            .copy(props.position)
            .add(element.position);
        ;
        return React.createElement(allElements[element.type], {...element, position});
    }

    return (
        <>
            {props.elements.map((element) => createChunkElement(element))}
        </>
    );
}