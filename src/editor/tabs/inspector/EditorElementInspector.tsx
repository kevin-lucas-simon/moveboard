import {ElementModel} from "../../../data/model/element/ElementModel";
import {UUID} from "../../../data/model/shared/UUID";
import React from "react";
import {EditorReducerActions} from "../../reducer/editorReducer";
import {BaseTab} from "../../component/BaseTab";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {JsonNestedEditor} from "../../component/input/JsonNestedEditor";
import {ChunkID, ChunkModel} from "../../../data/model/world/ChunkModel";
import {LevelModel} from "../../../data/model/world/LevelModel";
import {ElementType} from "../../../data/model/element/ElementType";
import {JointModel} from "../../../data/model/element/joint/JointModel";

export type EditorElementInspectorProps = {
    level: LevelModel;
    chunk: ChunkModel;
    selected: UUID[];
    dispatcher: React.Dispatch<EditorReducerActions>;
}

export function EditorElementInspector(props: EditorElementInspectorProps) {
    const selectedElement = props.selected[0] ? props.chunk.elements[props.selected[0]] : undefined;
    if (!selectedElement) {
        return <></>
    }

    const deselectElement = () => {
        props.dispatcher({
            type: "editor_deselect_all",
        });
    }

    const changeElement = (index: string, value: ElementModel) => {
        props.dispatcher({
            type: 'chunk_update_element',
            payload: value,
        });
    }

    // get a selection of all chunks that can be selected as joint neighbour
    const getChunkSelection = (jointNeighbour: ChunkID|null): {[id: UUID]: string} => {
        // get all joints in the current chunk
        const chunkJoints = Object
            .values(props.chunk.elements)
            .filter(element => element.type === ElementType.Joint) as JointModel[];

        // populate the selection with all chunks except the active chunk
        const chunkSelection = {} as {[id: UUID]: string};
        Object.values(props.level.chunks)
            .filter(chunk => chunk.id !== props.chunk.id)
            .forEach(chunk => {
                // skip chunks that are already connected
                if (chunkJoints.some(joint => joint.neighbour === chunk.id)) {
                    return;
                }
                chunkSelection[chunk.id] = chunk.name;
            });

        // if a joint neighbour is specified as value, ensure it is included in the selection (display name)
        if (jointNeighbour) {
            chunkSelection[jointNeighbour] = props.level.chunks[jointNeighbour].name;
        }
        return chunkSelection;
    };

    return (
        <BaseTab
            title={!selectedElement.name ? selectedElement.type : selectedElement.name}
            description={selectedElement.type}
            actionIcon={<XMarkIcon className="w-6" />}
            onAction={deselectElement}
        >
            <ul>
                <JsonNestedEditor
                    keyName={selectedElement.type}
                    value={selectedElement}
                    onKeyValueChange={(key, value) => changeElement(selectedElement.id, value)}
                    selectionOnKey={{
                        "neighbour": getChunkSelection((selectedElement as JointModel).neighbour)
                    }}
                />
            </ul>
        </BaseTab>
    );
}
