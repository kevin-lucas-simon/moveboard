import React from "react";
import {ElementModel} from "../../../data/model/element/ElementModel";

export type EditorElementSlugProps = {
    element: ElementModel;
}

export function EditorElementSlug(props: EditorElementSlugProps) {
    return (
        <button>
            {!props.element.name ? props.element.type : props.element.name}
        </button>
    );
}
