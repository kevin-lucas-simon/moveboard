import React from "react";
import {BasePanel} from "../../component/BasePanel";
import {useEditorDispatcher, useEditorContext} from "../../reducer/EditorProvider";
import {EditorForm} from "../../form/EditorForm";
import {DebugSettings, DebugSettingsDefault} from "../../../experience/debug/settings/DebugSettingsProvider";

export function EditorSimulationOverviewPanel() {
    const settings = useEditorContext()?.simulationSettings;
    const dispatcher = useEditorDispatcher();

    if (!settings || !dispatcher) {
        return <span>No Debug Settings given</span>
    }

    const updateSettings = (settings: DebugSettings) => {
        dispatcher({
            type: "simulator_patch_settings",
            payload: settings,
        })
    }

    return (
        <BasePanel
            title={"Simulation"}
            description={"Game play test"}
        >
            <EditorForm
                itemValue={settings}
                itemDefault={DebugSettingsDefault}
                onChange={updateSettings}
            />
        </BasePanel>
    );
}
