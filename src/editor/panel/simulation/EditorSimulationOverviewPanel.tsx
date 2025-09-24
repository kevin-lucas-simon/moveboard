import React from "react";
import {JsonObjectEditor} from "../../component/input/JsonObjectEditor";
import {BaseTab} from "../../component/BaseTab";
import {useEditorActions, useEditorContext} from "../../reducer/EditorProvider";

export function EditorSimulationOverviewPanel() {
    const settings = useEditorContext()?.simulationSettings;
    const dispatcher = useEditorActions();

    if (!settings || !dispatcher) {
        return <span>No Debug Settings given</span>
    }

    const handleSettingsChange = (key: string, value: any) => {
        dispatcher({
            type: "simulator_patch_settings",
            payload: {
                [key]: value,
            },
        })
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
