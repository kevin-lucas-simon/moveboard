import {Environment} from "../../../experience/Environment";
import {Level} from "../../../experience/world/Level";
import React from "react";
import {useEditorActiveStructure, useEditorLevel} from "../../reducer/EditorProvider";
import {DebugSettingsDefault, DebugSettingsProvider} from "../../../experience/debug/settings/DebugSettingsProvider";
import {StructureTypes} from "../../../data/model/structure/StructureTypes";

export function EditorChunkScenePanel() {
    const level = useEditorLevel();
    const structure = useEditorActiveStructure();
    if (!level || !structure || structure.type !== StructureTypes.Chunk) {
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
