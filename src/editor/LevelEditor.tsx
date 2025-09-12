import React, {useState} from "react";
import {EditorToaster} from "./component/EditorToaster";
import {useEditorContext} from "./reducer/EditorProvider";
import {EditorStructureMenu} from "./layout/EditorStructureMenu";
import {EditorStructureEditor} from "./content/EditorStructureEditor";
import {EditorTestEditor} from "./content/EditorTestEditor";

enum EditorMode {
    LEVEL_STRUCTURE = "editor_structure",
    PLAY_TEST = "editor_play",
}

export function LevelEditor() {
    const [tab, setTab] = useState<EditorMode>(EditorMode.LEVEL_STRUCTURE);

    const editor = useEditorContext();
    if (!editor) {
        return <></>;
    }

    return (
        <div className="w-full h-full flex bg-gray-500/10">
            <EditorToaster errors={editor.errors}/>

            <EditorStructureMenu onTestButtonClick={() => setTab(EditorMode.PLAY_TEST)}/>

            {(() => {
                switch (tab) {
                    case EditorMode.LEVEL_STRUCTURE:
                        return <EditorStructureEditor/>;
                    case EditorMode.PLAY_TEST:
                        return <EditorTestEditor/>;
                    default:
                        return <></>;
                }
            })()}
        </div>
    );
}