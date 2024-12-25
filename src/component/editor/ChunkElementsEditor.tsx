import {ElementModel} from "../../experience/world/model/ElementModel";
import React from "react";
import {allElements} from "../../experience/config/allElements";
import {BasicBlockDefault} from "../../experience/element/block/BasicBlock";
import {JsonObjectEditor} from "./JsonObjectEditor";

export type ChunkElementsEditorProps = {
    elements: ElementModel[];
    onElementsChange: (elements: ElementModel[]) => void;
}

export function ChunkElementsEditor(props: ChunkElementsEditorProps) {
    const handleAddedElement = () => {
        const newElement = React.createElement(allElements["BasicBlock"], BasicBlockDefault);

        props.onElementsChange([
            ...props.elements,
            newElement.props,
        ]);
    }

    const handleChangedElement = (index: string, value: ElementModel) => { // TODO index ist unschön
        props.onElementsChange(
            props.elements.map((el, i) => i !== parseInt(index) ? el : value)
        );
    }

    const handleRemovedElement = (index: string) => {
        props.onElementsChange(
            props.elements.filter((e, i) => i !== parseInt(index))
        );
    }

    return (
        <ul>
            {props.elements.map((element, index) =>
                <JsonObjectEditor
                    key={index}
                    keyName={index.toString()}
                    displayname={element.type}
                    value={element}
                    onChange={handleChangedElement}
                    onDelete={handleRemovedElement}
                />
            )}
            <li>
                <button
                    className="flex gap-2 w-full py-1 px-2 font-bold text-left bg-gray-600 border border-gray-700"
                    onClick={handleAddedElement}
                >
                    <span>&#43;</span>
                    <span>Add</span>
                </button>
            </li>
        </ul>
    );

}
