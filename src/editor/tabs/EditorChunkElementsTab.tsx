import {ElementModel} from "../../data/model/element/ElementModel";
import React from "react";
import {elementConfig} from "../../config/elementConfig";
import {BaseTab} from "../component/BaseTab";
import {EditorReducerActions} from "../reducer/editorReducer";
import {UUID} from "../../data/model/shared/UUID";
import {EditorElementList} from "./list/EditorElementList";
import {createElement} from "../../data/factory/ElementFactory";
import {ElementType} from "../../data/model/ElementType";

export type EditorChunkElementsTabProps = {
    elements: {[key: string]: ElementModel};
    selected: UUID[];
    dispatcher: React.Dispatch<EditorReducerActions>;
}

export function EditorChunkElementsTab(props: EditorChunkElementsTabProps) {
    const addElement = (type?: string) => {
        if (!type || !(type in elementConfig)) {
            return;
        }
        const element = createElement(type as ElementType)
        props.dispatcher({
            type: 'chunk_add_element',
            payload: element,
        });
        props.dispatcher({
            type: "editor_select",
            payload: element.id,
        });
    }

    return (
        <BaseTab
            title={"Chunk Elements"}
            description={"Fill the chunk area with static elements."}
            addOptions={Object.keys(elementConfig)}
            onAction={addElement}
        >
            <EditorElementList
                elements={props.elements}
                selected={props.selected}
                dispatcher={props.dispatcher}
                parent={null}
            />
        </BaseTab>
    );
}
