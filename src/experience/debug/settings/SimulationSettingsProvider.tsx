import React, {createContext, useContext} from "react";

export type SimulationSettings = {
    isEditingMode: boolean,
    displayEditorFeatures: boolean,
    displayPerformanceStats: boolean,
    moveableCamera: boolean,
    pauseSimulation: boolean,
}
export const SimulationSettingsDefault: SimulationSettings = {
    isEditingMode: false,
    displayEditorFeatures: false,
    displayPerformanceStats: false,
    moveableCamera: false,
    pauseSimulation: false,
}

const SimulationSettingsContext = createContext<SimulationSettings|null>(null);

export type SimulationSettingsProviderProps = {
    simulationSettings: SimulationSettings,
    children: React.ReactNode,
}

export function SimulationSettingsProvider(props: SimulationSettingsProviderProps) {
    return (
        <SimulationSettingsContext.Provider value={props.simulationSettings}>
            {props.children}
        </SimulationSettingsContext.Provider>
    );
}

export function useSimulationSettings(): SimulationSettings|null {
    return useContext(SimulationSettingsContext);
}