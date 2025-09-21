import React, {useState} from "react";
import {EditorToaster} from "./component/EditorToaster";
import {useEditorContext} from "./reducer/EditorProvider";
import {EditorStructureMenu} from "./layout/EditorStructureMenu";
import {EditorStructureEditor} from "./content/EditorStructureEditor";
import {EditorPanel} from "./panel/EditorPanelComponents";

type EditorPanelOverride = typeof EditorPanel.TestPlay | undefined;

export function LevelEditor() {
    const [overridePanel, setOverridePanel] = useState<EditorPanelOverride>(undefined)

    const editor = useEditorContext();
    if (!editor) {
        return <></>;
    }

    return (
        <div className="w-full h-full flex bg-gray-500/10">
            <EditorToaster errors={editor.errors}/>

            <EditorStructureMenu
                isTestPlay={overridePanel === EditorPanel.TestPlay}
                onClickTestPlay={() => {
                    setOverridePanel(overridePanel === EditorPanel.TestPlay ? undefined : EditorPanel.TestPlay);
                }}
            />

            <EditorStructureEditor panelOverride={overridePanel}/>
        </div>
    );
}