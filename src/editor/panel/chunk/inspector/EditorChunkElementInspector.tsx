import {ElementModel} from "../../../../data/model/element/ElementModel";
import {UUID} from "../../../../data/model/UUID";
import React from "react";
import {EditorReducerActions} from "../../../reducer/editorReducer";
import {BasePanel} from "../../../component/BasePanel";
import {TrashIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {JsonNestedEditor} from "../../../component/input/JsonNestedEditor";
import {LevelModel} from "../../../../data/model/world/LevelModel";
import {JointModel} from "../../../../data/model/element/joint/JointModel";
import {LinkButton} from "../../../../component/button/LinkButton";
import {ElementTypes} from "../../../../data/model/element/ElementTypes";
import {ChunkID, ChunkModel} from "../../../../data/model/structure/spacial/ChunkModel";
import {StructureTypes} from "../../../../data/model/structure/StructureTypes";

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

    const changeElement = (index: string, value: ElementModel) => {
        props.dispatcher({
            type: 'chunk_patch_element',
            payload: value,
        });
    }

    const deleteElement = () => {
        deselectElement();
        props.dispatcher({
            type: 'chunk_remove_element',
            payload: props.element.id,
        });
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
            <ul>
                <JsonNestedEditor
                    keyName={props.element.type}
                    value={props.element}
                    onKeyValueChange={(key, value) => changeElement(props.element.id, value)}
                    selectionOnKey={{
                        "neighbour": getAvailableNeighbourChunkNames((props.element as JointModel).neighbour)
                    }}
                />
                <li className="px-2 py-4">
                    <LinkButton onClick={deleteElement}>
                        <TrashIcon className="w-4" />
                        Delete Element
                    </LinkButton>
                </li>
            </ul>
        </BasePanel>
    );
}
