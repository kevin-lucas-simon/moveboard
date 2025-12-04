import React from "react";
import {ElementModel} from "../../../../data/model/element/ElementModel";
import {BaseInputSlug} from "../../../component/slug/BaseInputSlug";

export type EditorChunkElementSlugProps = {
    element: ElementModel;
    onRename: (name: string) => void;
}

export function EditorChunkElementSlug(props: EditorChunkElementSlugProps) {
    return (
        <BaseInputSlug
            value={props.element.name}
            placeholder={props.element.type}
            onRename={props.onRename}
        />
    )
}
