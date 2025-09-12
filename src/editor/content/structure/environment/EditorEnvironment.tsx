import {Environment} from "../../../../experience/Environment";
import {Level} from "../../../../experience/world/Level";
import React from "react";
import {useEditorActiveStructure, useEditorLevel} from "../../../reducer/EditorProvider";
import {DebugSettingsDefault, DebugSettingsProvider} from "../../../../experience/input/DebugSettingsProvider";

export function EditorEnvironment() {
    const level = useEditorLevel();
    const structure = useEditorActiveStructure();
    if (!level || !structure) {
        return <></>;
    }

    return (
        <DebugSettingsProvider debugSettings={{
            ...DebugSettingsDefault,
            isEditingMode: true,
            displayEditorFeatures: true,
            moveableCamera: true,
            pauseSimulation: true,
        }}>
            <Environment key={structure.id} isGranted={false}>
                <Level {...level} start={structure.id}/>
            </Environment>
        </DebugSettingsProvider>
    );
}
