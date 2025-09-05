import {Select} from "@react-three/postprocessing";
import {ElementModel} from "../../data/model/element/ElementModel";
import {elementConfig} from "../../config/elementConfig";
import React from "react";
import {useEditorActions, useEditorContext} from "../../editor/reducer/EditorProvider";
import {ThreeEvent} from "@react-three/fiber/dist/declarations/src/core/events";
import {StructureType} from "../../data/model/StructureType";
import {ChunkModel} from "../../data/model/structure/structure.models";
import {filterStructures} from "../../data/factory/StructureFactory";
import {ElementType} from "../../data/model/ElementType";

export type ElementProps = ElementModel & {
    children?: React.ReactNode;
};

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

        const activeChunk = filterStructures<ChunkModel>(editorContext.level.structures, StructureType.Chunk)[editorContext.active];
        const isInActiveChunk = activeChunk?.elements[props.id] !== undefined;
        if (!isInActiveChunk) {
            return;
        }

        e.stopPropagation();

        if (!selected) {
            editorActions({
                type: 'editor_select',
                payload: props.id,
            });
            return;
        }

        editorActions({
            type: 'editor_deselect_all',
        });
    }

    const component = React.createElement(
        elementConfig[props.type as ElementType]?.experienceComponent ?? elementConfig[ElementType.Unknown].experienceComponent,
        {
            ...props,
            key: props.id,
        },
    );

    return (
        <Select enabled={selected} onDoubleClick={selectElement}>
            {props.children ?? component}
        </Select>
    );
}
