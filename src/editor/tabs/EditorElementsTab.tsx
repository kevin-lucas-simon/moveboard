import {ElementModel} from "../../experience/world/model/ElementModel";
import React from "react";
import {allElements} from "../../experience/config/allElements";
import {BasicBlockDefault} from "../../experience/element/block/BasicBlock";
import {ListObjectEditor} from "../ListObjectEditor";

export type ChunkElementsEditorProps = {
    elements: ElementModel[];
    onElementsChange: (elements: ElementModel[]) => void;
}

export function EditorElementsTab(props: ChunkElementsEditorProps) {
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
        <div className="w-full h-full flex flex-col">
            <h2 className="text-xl pt-4 px-4">Elements</h2>
            <div className="grow h-0 overflow-y-auto">
                <p className="text-sm px-4 py-2">
                    Fill the chunk area with static elements.
                </p>
                <ul>
                    {props.elements.map((element, index) =>
                        <li key={index} className="flex flex-col divide-gray-500/20">
                            <ListObjectEditor
                                key={index}
                                keyName={index.toString()}
                                displayname={element.type}
                                value={element}
                                onChange={handleChangedElement}
                                onDelete={handleRemovedElement}
                            />
                        </li>
                    )}
                </ul>
            </div>
            <button
                className="flex w-full hover:bg-gray-500/10 px-4 py-2 gap-1 border-t border-gray-500/10"
                onClick={handleAddedElement}
            >
                <span className="w-4 text-left">&#43;</span>
                <span>Add Element</span>
            </button>
        </div>
    );

}
