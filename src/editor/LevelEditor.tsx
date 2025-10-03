import React, {useState} from "react";
import {useEditorContext} from "./reducer/EditorProvider";
import {EditorCollapsibleActions} from "./layout/EditorCollapsibleActions";
import {EditorPanelCanvas} from "./panel/EditorPanelCanvas";

import {EditorPanelTypes} from "./panel/EditorPanelTypes";

type EditorPanelOverride = typeof EditorPanelTypes.Simulation | undefined;

export function LevelEditor() {
    const [overridePanel, setOverridePanel] = useState<EditorPanelOverride>(undefined)

    const editor = useEditorContext();
    if (!editor) {
        return <></>;
    }

    return (
        <div className="w-full h-full flex bg-gray-500/10">
            {/* TODO ich muss eine andere Herangehensweise hierfür haben seit dem reducer refactoring */}
            {/*<EditorMessageToaster errors={editor.errors}/>*/}

            <EditorCollapsibleActions
                isSimulation={overridePanel === EditorPanelTypes.Simulation}
                onSimulationButtonClick={() => setOverridePanel(overridePanel === EditorPanelTypes.Simulation ? undefined : EditorPanelTypes.Simulation)}
            />

            <EditorPanelCanvas panelOverride={overridePanel}/>
        </div>
    );
}