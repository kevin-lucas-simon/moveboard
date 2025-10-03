import React from "react";
import {JsonObjectEditor} from "../../component/input/JsonObjectEditor";
import {BasePanel} from "../../component/BasePanel";
import {useEditorDispatcher, useEditorContext} from "../../reducer/EditorProvider";

export function EditorSimulationOverviewPanel() {
    const settings = useEditorContext()?.simulationSettings;
    const dispatcher = useEditorDispatcher();

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
        <BasePanel
            title={"Simulation"}
            description={"Game play test"}
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
        </BasePanel>
    );
}
