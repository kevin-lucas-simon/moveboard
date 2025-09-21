import {EditorContentBar} from "../layout/EditorContentBar";
import {DefaultPlayDebugSettings, DebugSettingsProvider} from "../../experience/input/DebugSettingsProvider";
import {Environment} from "../../experience/Environment";
import {Level} from "../../experience/world/Level";
import React, {useState} from "react";
import {useEditorActiveStructure, useEditorLevel} from "../reducer/EditorProvider";
import {EditorPlayTestTab} from "../tabs/EditorPlayTestTab";

export function EditorTestEditor() {
    const [debugSettings, setDebugSettings] = useState(DefaultPlayDebugSettings);

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
                    // settings={debugSettings}
                    // onSettingChange={handleSettingsChange}
                />
            }
            mainView={
                <DebugSettingsProvider debugSettings={debugSettings}>
                    <Environment key={structure.id} isGranted={false}>
                        <Level {...level} start={structure.id}/>
                    </Environment>
                </DebugSettingsProvider>
            }
        />
    );
}
