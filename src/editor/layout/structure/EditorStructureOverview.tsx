import React from "react";
import {BasePanel} from "../../component/BasePanel";
import {StructureTypes} from "../../../data/model/structure/StructureTypes";
import {createStructure} from "../../../data/factory/StructureFactory";
import {EditorStructureList} from "./list/EditorStructureList";
import {useEditorContext, useEditorDispatcher} from "../../reducer/EditorProvider";

export function EditorStructureOverview() {
    const editor = useEditorContext();
    const dispatcher = useEditorDispatcher();
    if (!editor || !dispatcher) {
        return <></>;
    }

    const addStructure = (type?: string) => {
        if (!type || !(type in StructureTypes)) {
            return;
        }

        const structure = createStructure(type as StructureTypes);
        dispatcher({
            type: 'level_add_structure',
            payload: structure,
        })
    }

    return (
        <BasePanel
            title={editor.level.name}
            onAction={addStructure}
            addOptions={Object.keys(StructureTypes).filter(key => key !== StructureTypes.Unknown)}
        >
            <EditorStructureList />
        </BasePanel>
    );
}
