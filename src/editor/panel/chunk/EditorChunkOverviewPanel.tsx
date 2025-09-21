import React from "react";
import {ElementDefaultProps} from "../../../data/model/element/ElementDefaultProps";
import {BaseTab} from "../../component/BaseTab";
import {EditorChunkElementList} from "./list/EditorChunkElementList";
import {createElement} from "../../../data/factory/ElementFactory";
import {ElementTypes} from "../../../data/model/element/ElementTypes";
import {useEditorActions, useEditorContext, useEditorActiveStructure} from "../../reducer/EditorProvider";
import {StructureTypes} from "../../../data/model/structure/StructureTypes";
import {ChunkModel} from "../../../data/model/structure/spacial/ChunkModel";

export function EditorChunkOverviewPanel() {
    const dispatcher = useEditorActions();
    const elements = useEditorActiveStructure<ChunkModel>(StructureTypes.Chunk)?.elements;
    const selectedElementIds = useEditorContext()?.selectedElements ?? [];

    if (!dispatcher || !elements) {
        return <></>;
    }

    const addElement = (type?: string) => {
        if (!type || !(type in ElementDefaultProps)) {
            return;
        }
        const element = createElement(type as ElementTypes)
        dispatcher({
            type: 'chunk_add_element',
            payload: element,
        });
        dispatcher({
            type: "editor_select_element",
            payload: element.id,
        });
    }

    return (
        <BaseTab
            title={"Chunk Elements"}
            description={"Fill the chunk area with static elements."}
            addOptions={Object.keys(ElementDefaultProps)}
            onAction={addElement}
        >
            <EditorChunkElementList
                elements={elements}
                selected={selectedElementIds}
                dispatcher={dispatcher}
                parent={null}
            />
        </BaseTab>
    );
}
