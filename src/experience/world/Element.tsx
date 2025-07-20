import {Select} from "@react-three/postprocessing";
import {ElementModel} from "../../data/model/element/ElementModel";
import {elementConfig, elementFallbackConfig} from "../../config/elementConfig";
import {ElementType} from "../../data/model/element/ElementType";
import React from "react";
import {useEditorContext} from "../../editor/reducer/EditorProvider";

export type ElementProps = ElementModel;

export function Element(props: ElementProps) {
    const editorContext = useEditorContext();

    const selected = editorContext?.selected.includes(props.id) ?? false;

    const component = React.createElement(
        elementConfig[props.type as ElementType]?.experienceComponent ?? elementFallbackConfig.experienceComponent,
        {
            ...props,
            key: props.id,
        },
    );

    return (
        <Select enabled={selected}>
            {component}
        </Select>
    );
}
