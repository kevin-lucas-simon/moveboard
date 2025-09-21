import {ElementModel} from "../../../../data/model/element/ElementModel";
import {UUID} from "../../../../data/model/UUID";
import React from "react";
import {EditorReducerActions} from "../../../reducer/editorReducer";
import {BaseTab} from "../../../component/BaseTab";
import {TrashIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {JsonNestedEditor} from "../../../component/input/JsonNestedEditor";
import {LevelModel} from "../../../../data/model/world/LevelModel";
import {JointModel} from "../../../../data/model/element/joint/JointModel";
import {LinkButton} from "../../../../component/button/LinkButton";
import {ElementTypes} from "../../../../data/model/element/ElementTypes";
import {ChunkID, ChunkModel} from "../../../../data/model/structure/spacial/ChunkModel";

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

    // get a selection of all chunks that can be selected as joint neighbour
    const getChunkSelection = (jointNeighbour: ChunkID|null): {[id: UUID]: string} => {
        // get all joints in the current chunk
        const chunkJoints = Object
            .values(props.chunk.elements)
            .filter(element => element.type === ElementTypes.Joint) as JointModel[];

        // populate the selection with all chunks except the active chunk
        const chunkSelection = {} as {[id: UUID]: string};
        Object.values(props.level.structures)
            .filter(structure => structure.id !== props.chunk.id)
            .forEach(chunk => {
                // skip chunks that are already connected
                if (chunkJoints.some(joint => joint.neighbour === chunk.id)) {
                    return;
                }
                chunkSelection[chunk.id] = chunk.name;
            });

        // if a joint neighbour is specified as value, ensure it is included in the selection (display name)
        if (jointNeighbour) {
            chunkSelection[jointNeighbour] = props.level.structures[jointNeighbour].name;
        }
        return chunkSelection;
    };

    return (
        <BaseTab
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
                        "neighbour": getChunkSelection((props.element as JointModel).neighbour)
                    }}
                />
                <li className="px-2 py-4">
                    <LinkButton onClick={deleteElement}>
                        <TrashIcon className="w-4" />
                        Delete Element
                    </LinkButton>
                </li>
            </ul>
        </BaseTab>
    );
}
