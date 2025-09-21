import React, {useState} from "react";
import {EditorToaster} from "./component/EditorToaster";
import {useEditorContext} from "./reducer/EditorProvider";
import {EditorStructureMenu} from "./layout/EditorStructureMenu";
import {EditorPanelCanvas} from "./panel/EditorPanelCanvas";
import {EditorPanelTypes} from "./panel/EditorPanelComponents";

type EditorPanelOverride = typeof EditorPanelTypes.TestPlay | undefined;

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
                isTestPlay={overridePanel === EditorPanelTypes.TestPlay}
                onClickTestPlay={() => {
                    setOverridePanel(overridePanel === EditorPanelTypes.TestPlay ? undefined : EditorPanelTypes.TestPlay);
                }}
            />

            <EditorPanelCanvas panelOverride={overridePanel}/>
        </div>
    );
}