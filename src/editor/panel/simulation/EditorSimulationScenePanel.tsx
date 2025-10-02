import {Environment} from "../../../experience/Environment";
import {Level} from "../../../experience/world/Level";
import React from "react";
import {useEditorActiveStructure, useEditorContext, useEditorLevel} from "../../reducer/EditorProvider";
import {DebugSettingsProvider} from "../../../experience/debug/settings/DebugSettingsProvider";
import {StructureTypes} from "../../../data/model/structure/StructureTypes";

export function EditorSimulationScenePanel() {
    const level = useEditorLevel();
    const structure = useEditorActiveStructure();

    const debugSettings = useEditorContext()?.simulationSettings;

    if (!level || !structure || !debugSettings || structure.type !== StructureTypes.Chunk) {
        return <></>;
    }

    return (
        <DebugSettingsProvider debugSettings={debugSettings}>
            <Environment key={structure.id} isGranted={false}>
                <Level {...level} start={structure.id}/>
            </Environment>
        </DebugSettingsProvider>
    );
}
