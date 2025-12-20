import {ElementModel} from "../../../../data/model/element/ElementModel";
import {UUID} from "../../../../data/model/UUID";
import React from "react";
import {EditorReducerActions} from "../../../reducer/editorReducer";
import {BasePanel} from "../../../component/BasePanel";
import {TrashIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {LevelModel} from "../../../../data/model/world/LevelModel";
import {JointModel} from "../../../../data/model/element/joint/JointModel";
import {ElementTypes} from "../../../../data/model/element/ElementTypes";
import {ChunkID, ChunkModel} from "../../../../data/model/structure/spacial/ChunkModel";
import {StructureTypes} from "../../../../data/model/structure/StructureTypes";
import {EditorForm} from "../../../form/EditorForm";
import {ElementDefaultProps} from "../../../../data/model/element/ElementDefaultProps";
import {ColorTypes} from "../../../../data/model/Color";
import {BaseListItem} from "../../../component/BaseListItem";

export type EditorElementInspectorProps = {
    dispatcher: React.Dispatch<EditorReducerActions>;
    level: LevelModel;
    chunk: ChunkModel;
    element: ElementModel;
}

export function EditorChunkElementInspector(props: EditorElementInspectorProps) {
    const deselectElement = () => {
        props.dispatcher({
            type: "editor_deselect_all",
        });
    }

    const updateElement = (element: ElementModel) => {
        props.dispatcher({
            type: 'chunk_patch_element',
            payload: element,
        })
    }

    const deleteElement = () => {
        deselectElement();
        props.dispatcher({
            type: 'chunk_remove_element',
            payload: props.element.id,
        });
    }

    const getColorTypes = () => {
        const swapped = Object.entries(ColorTypes).map(
            ([key, value]) => [value, key]
        );
        return Object.fromEntries(swapped)
    }

    const getAvailableNeighbourChunkNames = (jointNeighbour: ChunkID|null): {[id: UUID]: string} => {
        const chunkJoints = Object
            .values(props.chunk.elements)
            .filter(element => element.type === ElementTypes.Joint) as JointModel[];

        const availableChunkNames = {} as {[id: UUID]: string};
        Object.values(props.level.structures)
            .filter(structure => structure.type === StructureTypes.Chunk)
            .filter(structure => structure.id !== props.chunk.id)
            .forEach(chunk => {
                // skip chunks that are already connected
                if (chunkJoints.some(joint => joint.neighbour === chunk.id)) {
                    return;
                }
                availableChunkNames[chunk.id] = chunk.name;
            });

        if (jointNeighbour) {
            availableChunkNames[jointNeighbour] = props.level.structures[jointNeighbour]?.name;
        }
        return availableChunkNames;
    };

    return (
        <BasePanel
            title={!props.element.name ? props.element.type : props.element.name}
            description={props.element.type}
            actionIcon={<XMarkIcon className="w-6" />}
            onAction={deselectElement}
        >
            <EditorForm
                itemValue={props.element}
                itemDefault={ElementDefaultProps[props.element.type].defaultProps}
                onChange={updateElement}
                hiddenKeys={['parent', 'hidden']}
                relationKeys={{
                    "color": getColorTypes(),
                    "neighbour": getAvailableNeighbourChunkNames((props.element as JointModel).neighbour)
                } as {[key in keyof ElementModel]?: {[id: UUID]: string}}}
                additionalEntries={{
                    "Actions": <ul>
                        <BaseListItem onClick={deleteElement}>
                            <TrashIcon className="w-4" />
                            Delete Element
                        </BaseListItem>
                    </ul>
                }}
            />
        </BasePanel>
    );
}
