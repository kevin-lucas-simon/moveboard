import React, {useState} from "react";
import {EditorToaster} from "./component/EditorToaster";
import {useEditorContext} from "./reducer/EditorProvider";
import {EditorStructureMenu} from "./layout/EditorStructureMenu";
import {EditorStructureEditor} from "./content/EditorStructureEditor";
import {EditorTestEditor} from "./content/EditorTestEditor";

export function LevelEditor() {
    const [isTestPlay, setTestPlay] = useState<boolean>(false)
    const editor = useEditorContext();
    if (!editor) {
        return <></>;
    }

    return (
        <div className="w-full h-full flex bg-gray-500/10">
            <EditorToaster errors={editor.errors}/>

            <EditorStructureMenu
                isTestPlay={isTestPlay}
                onClickTestPlay={() => setTestPlay(!isTestPlay)}
            />

            {isTestPlay
                ? <EditorTestEditor/>
                : <EditorStructureEditor/>
            }
        </div>
    );
}