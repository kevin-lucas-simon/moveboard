import {ElementModel} from "../../experience/world/model/ElementModel";
import {JsonObjectEditor} from "./JsonObjectEditor";
import React from "react";
import {allElements} from "../../experience/config/allElements";
import {BasicBlockDefault} from "../../experience/element/block/BasicBlock";

export type ChunkElementsEditorProps = {
    elements: ElementModel[];
    onElementsChange: (elements: ElementModel[]) => void;
}

export function ChunkElementsEditor(props: ChunkElementsEditorProps) {
    const handleAddedElement = () => {
        const newElement = React.createElement(allElements["BasicBlock"], BasicBlockDefault);

        props.onElementsChange([
            newElement.props,
            ...props.elements,
        ]);
    }

    const handleChangedElement = (index: string, value: ElementModel) => { // TODO index ist unschön
        props.onElementsChange(
            props.elements.map((el, i) => i !== parseInt(index) ? el : value)
        );
    }

    const handleRemovedElement = (index: number) => {
        props.onElementsChange(
            props.elements.filter((e, i) => i !== index)
        );
    }

    return (
        <ul>
            <li>
                <button className="bg-gray-600" onClick={handleAddedElement}>Add</button>
            </li>

            {props.elements.map((element, index) =>
                <li className="mt-4">
                    <JsonObjectEditor key={index} keyword={index.toString()} value={element}
                                      onKeyValueChange={handleChangedElement}/>
                    <button className="bg-gray-600" onClick={() => handleRemovedElement(index)}>Delete</button>
                </li>
            )}
        </ul>
    );

}
