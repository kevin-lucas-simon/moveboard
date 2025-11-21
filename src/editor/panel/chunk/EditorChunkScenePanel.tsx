import React from "react";
import {useEditorActiveStructure, useEditorLevel} from "../../reducer/EditorProvider";
import {DebugSettingsDefault, DebugSettingsProvider} from "../../../experience/debug/settings/DebugSettingsProvider";
import {StructureTypes} from "../../../data/model/structure/StructureTypes";
import {Experience} from "../../../experience/Experience";

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
            <Experience
                key={structure.id}
                isGranted={false}
                level={level}
                start={structure.id}
            />
        </DebugSettingsProvider>
    );
}
