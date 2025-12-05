import React from "react";
import {ElementDefaultProps} from "../../../data/model/element/ElementDefaultProps";
import {BasePanel} from "../../component/BasePanel";
import {createElement} from "../../../data/factory/ElementFactory";
import {ElementTypes} from "../../../data/model/element/ElementTypes";
import {useEditorDispatcher, useEditorContext, useEditorActiveStructure} from "../../reducer/EditorProvider";
import {StructureTypes} from "../../../data/model/structure/StructureTypes";
import {ChunkModel} from "../../../data/model/structure/spacial/ChunkModel";
import {ChunkElementList} from "./list/ChunkElementList";

export function EditorChunkOverviewPanel() {
    const dispatcher = useEditorDispatcher();
    const chunk = useEditorActiveStructure<ChunkModel>(StructureTypes.Chunk);
    const selectedElementIds = useEditorContext()?.selectedElements ?? [];

    if (!dispatcher || !chunk) {
        return <></>;
    }

    const elements = chunk.elements;

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
        <BasePanel
            title={chunk.name.trim() !== "" ? chunk.name : chunk.type}
            description={chunk.type}
            addOptions={Object.keys(ElementTypes)}
            onAction={addElement}
        >
            <ChunkElementList
                elements={elements}
                selected={selectedElementIds}
            />
        </BasePanel>
    );
}
