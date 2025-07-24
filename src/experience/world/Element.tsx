import {Select} from "@react-three/postprocessing";
import {ElementModel} from "../../data/model/element/ElementModel";
import {elementConfig, elementFallbackConfig} from "../../config/elementConfig";
import {ElementType} from "../../data/model/element/ElementType";
import React from "react";
import {useEditorActions, useEditorContext} from "../../editor/reducer/EditorProvider";
import {ThreeEvent} from "@react-three/fiber/dist/declarations/src/core/events";

export type ElementProps = ElementModel;

export function Element(props: ElementProps) {
    const editorContext = useEditorContext();
    const editorActions = useEditorActions();

    if (props.hidden) {
        return <></>
    }

    const selected = editorContext?.selected.includes(props.id) ?? false;

    const selectElement = (e: ThreeEvent<MouseEvent>) => {
        if (!editorContext || !editorActions) {
            return;
        }
        e.stopPropagation();

        if (selected) {
            editorActions({
                type: 'editor_deselect_all',
            });
            return;
        } else {
            editorActions({
                type: 'editor_select',
                payload: props.id,
            });
        }
    }

    const component = React.createElement(
        elementConfig[props.type as ElementType]?.experienceComponent ?? elementFallbackConfig.experienceComponent,
        {
            ...props,
            key: props.id,
        },
    );

    return (
        <Select enabled={selected} onDoubleClick={selectElement}>
            {component}
        </Select>
    );
}
