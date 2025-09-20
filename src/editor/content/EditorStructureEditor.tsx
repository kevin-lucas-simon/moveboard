import {EditorContentBar} from "../layout/EditorContentBar";
import React from "react";
import {useEditorActiveStructure} from "../reducer/EditorProvider";
import {StructureEditorComponents} from "./structure/StructureEditorComponents";

export function EditorStructureEditor() {
    const structure = useEditorActiveStructure();
    if (!structure) {
        return <></>;
    }

    const overviewPanel = React.createElement(
        StructureEditorComponents[structure.type]?.overviewPanel
    );

    const mainView = React.createElement(
        StructureEditorComponents[structure.type]?.mainPanel
    );

    const inspectorDefinition = StructureEditorComponents[structure.type]?.detailPanel
    const inspectorComponent = inspectorDefinition
        ? React.createElement(inspectorDefinition)
        : undefined;

    return (
        <EditorContentBar
            leftMenu={overviewPanel}
            rightMenu={inspectorComponent}
            mainView={mainView}
        />
    );
}
