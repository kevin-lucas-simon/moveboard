import React, {useRef} from "react";
import {ElementModel} from "../../../../data/model/element/ElementModel";
import {BaseSlug} from "../../../component/BaseSlug";

export type EditorChunkElementSlugProps = {
    element: ElementModel;
    onRename: (name: string) => void;
}

export function EditorChunkElementSlug(props: EditorChunkElementSlugProps) {
    return (
        <BaseSlug
            value={props.element.name}
            placeholder={props.element.type}
            onRename={props.onRename}
        />
    )
}
