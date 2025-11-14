import React, {createContext, useContext} from "react";

export type DebugSettings = { // TODO rename zu SimulationSettings
    isEditingMode: boolean,
    displayEditorFeatures: boolean,
    displayPerformanceStats: boolean,
    moveableCamera: boolean,
    pauseSimulation: boolean,
}
export const DebugSettingsDefault: DebugSettings = {
    isEditingMode: false,
    displayEditorFeatures: false,
    displayPerformanceStats: false,
    moveableCamera: false,
    pauseSimulation: false,
}

const DebugSettingsContext = createContext<DebugSettings|null>(null);

export type DebugSettingsProviderProps = {
    debugSettings: DebugSettings,
    children: React.ReactNode,
}

/**
 * Provide the debug settings, access via useDebugSettings hook
 * @param props
 * @constructor
 */
export function DebugSettingsProvider(props: DebugSettingsProviderProps) {
    return (
        <DebugSettingsContext.Provider value={props.debugSettings}>
            {props.children}
        </DebugSettingsContext.Provider>
    );
}

/**
 * Hook to access the debug settings
 * @return DebugSettings
 */
export function useDebugSettings(): DebugSettings|null {
    return useContext(DebugSettingsContext);
}