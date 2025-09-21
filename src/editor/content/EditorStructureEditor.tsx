import {EditorContentBar} from "../layout/EditorContentBar";
import React from "react";
import {useEditorActiveStructure} from "../reducer/EditorProvider";
import {EditorPanelComponents, EditorPanelTypes} from "../panel/EditorPanelComponents";

export type EditorStructureEditorProps = {
    panelOverride?: EditorPanelTypes|undefined;
}

export function EditorStructureEditor(props: EditorStructureEditorProps) {
    const structure = useEditorActiveStructure();
    const panel = props.panelOverride ?? structure?.type;
    if (!panel) {
        return <></>;
    }

    const overviewPanel = React.createElement(
        EditorPanelComponents[panel]?.overviewPanel
    );

    const mainView = React.createElement(
        EditorPanelComponents[panel]?.mainPanel
    );

    const inspectorDefinition = EditorPanelComponents[panel]?.detailPanel
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
