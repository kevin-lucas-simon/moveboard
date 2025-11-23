import React, {useState} from "react";
import {EditorCollapsibleActions} from "./layout/EditorCollapsibleActions";
import {EditorPanelCanvas} from "./panel/EditorPanelCanvas";

import {EditorPanelTypes} from "./panel/EditorPanelTypes";
import {EditorMessageToaster} from "./layout/EditorMessageToaster";

type EditorPanelOverride = typeof EditorPanelTypes.Simulation | undefined;

export function LevelEditor() {
    const [overridePanel, setOverridePanel] = useState<EditorPanelOverride>(undefined)

    return (
        <div className="w-full h-full flex">
            <EditorMessageToaster />

            <EditorCollapsibleActions
                isSimulation={overridePanel === EditorPanelTypes.Simulation}
                onSimulationButtonClick={() => setOverridePanel(overridePanel === EditorPanelTypes.Simulation ? undefined : EditorPanelTypes.Simulation)}
            />

            <EditorPanelCanvas panelOverride={overridePanel}/>
        </div>
    );
}