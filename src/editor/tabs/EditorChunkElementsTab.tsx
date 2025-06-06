import {ElementModel} from "../../model/ElementModel";
import React from "react";
import {elementDefinition} from "../../experience/config/elementDefinition";
import {ListObjectEditor} from "../input/ListObjectEditor";
import {BaseTab} from "./BaseTab";
import {ChunkReducerActions} from "../reducer/chunkReducer";
import {XMarkIcon} from "@heroicons/react/24/outline";

export type EditorChunkElementsTabProps = {
    elements: ElementModel[];
    chunkDispatcher: React.Dispatch<ChunkReducerActions>;
}

export function EditorChunkElementsTab(props: EditorChunkElementsTabProps) {
    const addElement = (type?: string) => {
        if (!type || !(type in elementDefinition)) {
            return;
        }
        props.chunkDispatcher({
            type: 'chunk_add_element',
            payload: elementDefinition[type].defaultProps,
        });
    }

    const changeElement = (index: string, value: ElementModel) => {
        props.chunkDispatcher({
            type: 'chunk_update_element',
            payload: {
                index: index,
                element: value,
            }
        });
    }

    const removeElement = (index: string) => {
        props.chunkDispatcher({
            type: 'chunk_remove_element',
            payload: index,
        });
    }

    return (
        <BaseTab
            title={"Chunk Elements"}
            description={"Fill the chunk area with static elements."}
            addOptions={Object.keys(elementDefinition)}
            onAdd={addElement}
        >
            <ul>
                {props.elements.map((element, index) =>
                    <li key={index} className="flex flex-col divide-gray-500/20">
                        <ListObjectEditor
                            key={index}
                            keyName={index.toString()}
                            displayname={element.type}
                            value={element}
                            onChange={changeElement}
                            actionButton={<XMarkIcon className="w-4" />}
                            onAction={() => removeElement(index.toString())}
                        />
                    </li>
                )}
            </ul>
        </BaseTab>
    );

}
