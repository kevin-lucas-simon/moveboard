import React from "react";
import {useDebugSettings} from "../../../experience/input/DebugSettingsProvider";
import {JsonObjectEditor} from "../../component/input/JsonObjectEditor";
import {BaseTab} from "../../component/BaseTab";

export function EditorSimulationOverviewPanel() {
    const settings = useDebugSettings();
    if (!settings) {
        return <span>No Debug Settings given</span>
    }

    const handleSettingsChange = () => {
        throw Error("onSettingChange: (key: string, value: any) => void; is not implemented")

        // const handleSettingsChange = (key: string, value: any) => {
        //     setDebugSettings({
        //         ...debugSettings,
        //         [key]: value,
        //     })
        // }
    }

    return (
        <BaseTab
            title={"Simulation"}
            description={"Simulate the behaviour of the chunk with some debug display options."}
        >
            <ul>
                {Object.entries(settings).map(([key, value]) =>
                    <JsonObjectEditor
                        key={key}
                        keyName={key}
                        value={value}
                        onChange={handleSettingsChange}
                    />
                )}
            </ul>
        </BaseTab>
    );
}
