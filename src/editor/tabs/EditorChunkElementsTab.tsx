import {ElementModel} from "../../model/ElementModel";
import React from "react";
import {elementConfig} from "../../config/elementConfig";
import {ListObjectEditor} from "../input/ListObjectEditor";
import {BaseTab} from "./BaseTab";
import {ChunkReducerActions} from "../reducer/chunkReducer";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {ElementBuilder} from "../../model/builder/ElementBuilder";

export type EditorChunkElementsTabProps = {
    elements: {[key: string]: ElementModel};
    chunkDispatcher: React.Dispatch<ChunkReducerActions>;
}

export function EditorChunkElementsTab(props: EditorChunkElementsTabProps) {
    const addElement = (type?: string) => {
        if (!type || !(type in elementConfig)) {
            return;
        }
        props.chunkDispatcher({
            type: 'chunk_add_element',
            payload: ElementBuilder.create(type).build(),
        });
    }

    const changeElement = (index: string, value: ElementModel) => {
        props.chunkDispatcher({
            type: 'chunk_update_element',
            payload: value,
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
            addOptions={Object.keys(elementConfig)}
            onAdd={addElement}
        >
            <ul>
                {
                    Object.entries(props.elements).map(([key, element]) => (
                        <li key={key} className="flex flex-col divide-gray-500/20">
                            <ListObjectEditor
                                key={key}
                                keyName={key}
                                displayname={element.type}
                                value={element}
                                onChange={changeElement}
                                actionButton={<XMarkIcon className="w-4"/>}
                                onAction={() => removeElement(key)}
                            />
                        </li>
                    ))
                }
            </ul>
        </BaseTab>
    );

}
