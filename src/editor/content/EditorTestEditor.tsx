import {EditorContentBar} from "../layout/EditorContentBar";
import {DebugSettingsDefault, DebugSettingsProvider} from "../../experience/input/DebugSettingsProvider";
import {Environment} from "../../experience/Environment";
import {Level} from "../../experience/world/Level";
import React, {useState} from "react";
import {useEditorActiveStructure, useEditorLevel} from "../reducer/EditorProvider";
import {EditorPlayTestTab} from "../tabs/EditorPlayTestTab";

export function EditorTestEditor() {
    const [debugSettings, setDebugSettings] = useState(DebugSettingsDefault);
    const [simulatorInstance, setSimulatorInstance] = useState<number>(0);

    const level = useEditorLevel();
    const structure = useEditorActiveStructure();
    if (!level || !structure) {
        return <></>;
    }

    const handleSettingsChange = (key: string, value: any) => {
        setDebugSettings({
            ...debugSettings,
            [key]: value,
        })
    }

    return (
        <EditorContentBar
            leftMenu={
                <EditorPlayTestTab
                    settings={debugSettings}
                    onSettingChange={handleSettingsChange}
                    onRestart={() => setSimulatorInstance(simulatorInstance+1)}
                />
            }
            mainView={
                <DebugSettingsProvider debugSettings={debugSettings}>
                    <Environment key={simulatorInstance} isGranted={false}>
                        <Level {...level} start={structure.id}/>
                    </Environment>
                </DebugSettingsProvider>
            }
        />
    );
}
