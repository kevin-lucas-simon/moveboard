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
            <li>
                <button className="bg-gray-600" onClick={handleAddedElement}>Add</button>
            </li>

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
        </ul>
    );

}
