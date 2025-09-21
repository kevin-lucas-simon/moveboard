import React, {useState} from "react";
import {EditorToaster} from "./layout/EditorToaster";
import {useEditorContext} from "./reducer/EditorProvider";
import {EditorCollapsibleMenu} from "./layout/EditorCollapsibleMenu";
import {EditorPanelCanvas} from "./panel/EditorPanelCanvas";
import {EditorPanelTypes} from "./panel/EditorPanelComponents";

type EditorPanelOverride = typeof EditorPanelTypes.Simulation | undefined;

export function LevelEditor() {
    const [overridePanel, setOverridePanel] = useState<EditorPanelOverride>(undefined)

    const editor = useEditorContext();
    if (!editor) {
        return <></>;
    }

    return (
        <div className="w-full h-full flex bg-gray-500/10">
            <EditorToaster errors={editor.errors}/>

            <EditorCollapsibleMenu
                isSimulation={overridePanel === EditorPanelTypes.Simulation}
                onSimulationButtonClick={() => setOverridePanel(overridePanel === EditorPanelTypes.Simulation ? undefined : EditorPanelTypes.Simulation)}
            />

            <EditorPanelCanvas panelOverride={overridePanel}/>
        </div>
    );
}