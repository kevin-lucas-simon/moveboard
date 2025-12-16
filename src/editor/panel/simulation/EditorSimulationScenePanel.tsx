import React from "react";
import {useEditorActiveStructure, useEditorContext, useEditorLevel} from "../../reducer/EditorProvider";
import {SimulationSettingsProvider} from "../../../experience/debug/settings/SimulationSettingsProvider";
import {StructureTypes} from "../../../data/model/structure/StructureTypes";
import {Experience} from "../../../experience/Experience";

export function EditorSimulationScenePanel() {
    const level = useEditorLevel();
    const structure = useEditorActiveStructure();

    const debugSettings = useEditorContext()?.simulationSettings;

    if (!level || !structure || !debugSettings || structure.type !== StructureTypes.Chunk) {
        return <></>;
    }

    return (
        <SimulationSettingsProvider simulationSettings={debugSettings}>
            <Experience
                key={structure.id}
                isGranted={false}
                level={level}
                start={structure.id}
            />
        </SimulationSettingsProvider>
    );
}
