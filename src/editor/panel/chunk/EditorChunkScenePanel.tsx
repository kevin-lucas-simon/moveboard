import React from "react";
import {useEditorActiveStructure, useEditorLevel} from "../../reducer/EditorProvider";
import {SimulationSettingsDefault, SimulationSettingsProvider} from "../../../experience/debug/settings/SimulationSettingsProvider";
import {StructureTypes} from "../../../data/model/structure/StructureTypes";
import {Experience} from "../../../experience/Experience";

export function EditorChunkScenePanel() {
    const level = useEditorLevel();
    const structure = useEditorActiveStructure();
    if (!level || !structure || structure.type !== StructureTypes.Chunk) {
        return <></>;
    }

    return (
        <SimulationSettingsProvider simulationSettings={{
            ...SimulationSettingsDefault,
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
        </SimulationSettingsProvider>
    );
}
