import {ElementModel} from "../../data/model/element/ElementModel";
import React from "react";
import {useEditorActions, useEditorContext} from "../../editor/reducer/EditorProvider";
import {ThreeEvent} from "@react-three/fiber/dist/declarations/src/core/events";
import {StructureTypes} from "../../data/model/structure/StructureTypes";
import {filterStructures} from "../../data/factory/StructureFactory";
import {ElementTypes} from "../../data/model/element/ElementTypes";
import {ChunkModel} from "../../data/model/structure/spacial/ChunkModel";
import {ElementExperienceComponents} from "../element/ElementExperienceComponents";
import {filterElements} from "../../data/factory/ElementFactory";
import {JointModel} from "../../data/model/element/joint/JointModel";

export type ElementProps = ElementModel & {
    children?: React.ReactNode;
};

export function Element(props: ElementProps) {
    const editorContext = useEditorContext();
    const editorActions = useEditorActions();

    if (props.hidden) {
        return <></>
    }

    const selected = editorContext?.selectedElements.includes(props.id) ?? false;

    const selectElement = (e: ThreeEvent<MouseEvent>) => {
        if (!editorContext || !editorActions) {
            return;
        }

        const allChunks = filterStructures<ChunkModel>(editorContext.level.structures, StructureTypes.Chunk);
        const activeChunk = allChunks[editorContext.selectedStructure];

        // jump to neighbour chunk if the element is not in the active chunk
        const isInActiveChunk = activeChunk?.elements[props.id] !== undefined;
        if (!isInActiveChunk) {
            const joints = filterElements<JointModel>(activeChunk.elements, ElementTypes.Joint);

            Object.values(joints).forEach(joint => {
                if (!joint.neighbour) {
                    return;
                }

                const neighbourChunk = allChunks[joint.neighbour];
                if (!neighbourChunk || !neighbourChunk.elements[props.id]) {
                    return;
                }

                e.stopPropagation();
                editorActions({
                    type: 'editor_select_structure',
                    payload: joint.neighbour,
                });
            });

            return;
        }

        // select element if not selected, otherwise deselect all
        e.stopPropagation();
        if (!selected) {
            editorActions({
                type: 'editor_select_element',
                payload: props.id,
            });
            return;
        }

        editorActions({
            type: 'editor_deselect_all',
        });
    }

    const component = React.createElement(
        ElementExperienceComponents[props.type as ElementTypes]?.experienceComponent ?? ElementExperienceComponents[ElementTypes.Unknown].experienceComponent,
        {
            ...props,
            key: props.id,
        },
    );

    return (
        <group onDoubleClick={selectElement}>
            {props.children ?? component}
        </group>
    );
}
