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




            {/* TODO hier dings, das Naming ist nun bei allen Tabs und Structure Layout Name hat Vorrang, dann der Typ

            also Level -> Structure -> Element, Im Collapsible soll der Level Name stehen,
            das Menü soll nur allgemein heißen, damit es in anderen Pages verwendet werden kann!
             und als description wird der Typ des Inhalts genannt, weil ja sekundäre Info, Name ist ja wichtiger
             */}

            <EditorCollapsibleActions
                isSimulation={overridePanel === EditorPanelTypes.Simulation}
                onSimulationButtonClick={() => setOverridePanel(overridePanel === EditorPanelTypes.Simulation ? undefined : EditorPanelTypes.Simulation)}
            />

            <EditorPanelCanvas panelOverride={overridePanel}/>
        </div>
    );
}