import {ElementModel} from "../../experience/world/model/ElementModel";
import React from "react";
import {allElements} from "../../experience/config/allElements";
import {BasicBlockDefault} from "../../experience/element/block/BasicBlock";
import {ListObjectEditor} from "../ListObjectEditor";
import {BaseTab} from "./BaseTab";
import {PlusIcon} from "@heroicons/react/24/outline";

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
        <BaseTab
            title={"Elements"}
            description={"Fill the chunk area with static elements."}
            button={<><PlusIcon className="h-4"/>Add Element</>}
            onButtonClick={handleAddedElement}
        >
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
        </BaseTab>
    );

}
