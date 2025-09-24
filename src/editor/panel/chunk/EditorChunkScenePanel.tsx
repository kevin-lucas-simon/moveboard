import {Environment} from "../../../experience/Environment";
import {Level} from "../../../experience/world/Level";
import React from "react";
import {useEditorActiveStructure, useEditorLevel} from "../../reducer/EditorProvider";
import {DebugSettingsProvider, DefaultEditorDebugSettings} from "../../../experience/debug/settings/DebugSettingsProvider";

export function EditorChunkScenePanel() {
    const level = useEditorLevel();
    const structure = useEditorActiveStructure();
    if (!level || !structure) {
        return <></>;
    }

    return (
        <DebugSettingsProvider debugSettings={DefaultEditorDebugSettings}>
            <Environment key={structure.id} isGranted={false}>
                <Level {...level} start={structure.id}/>
            </Environment>
        </DebugSettingsProvider>
    );
}
