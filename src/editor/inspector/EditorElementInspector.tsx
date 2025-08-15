import {ElementModel} from "../../data/model/element/ElementModel";
import {UUID} from "../../data/model/shared/UUID";
import React from "react";
import {EditorReducerActions} from "../reducer/editorReducer";
import {BaseTab} from "../tabs/BaseTab";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {JsonNestedEditor} from "../input/JsonNestedEditor";

export type EditorElementInspectorProps = {
    elements: {[key: string]: ElementModel};
    selected: UUID[];
    dispatcher: React.Dispatch<EditorReducerActions>;
}

export function EditorElementInspector(props: EditorElementInspectorProps) {
    const selectedElement = props.selected[0] ? props.elements[props.selected[0]] : undefined;
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

    return (
        <BaseTab
            title={selectedElement.type}
            actionIcon={<XMarkIcon className="w-6" />}
            onAction={deselectElement}
        >
            <ul className="mt-2">
                <JsonNestedEditor
                    keyName={selectedElement.type}
                    value={selectedElement}
                    onKeyValueChange={(key, value) => changeElement(selectedElement.id, value)}
                />
            </ul>
        </BaseTab>
    );
}
