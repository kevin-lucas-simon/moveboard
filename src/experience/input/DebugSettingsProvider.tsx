import {createContext, useContext} from "react";

export type DebugSettings = {
    isEditingMode: boolean,
    displayEditorFeatures: boolean,
    displayPerformanceStats: boolean,
    moveableCamera: boolean,
    pauseSimulation: boolean,
}
export const DefaultPlayDebugSettings: DebugSettings = {
    isEditingMode: false,
    displayEditorFeatures: false,
    displayPerformanceStats: false,
    moveableCamera: false,
    pauseSimulation: false,
}

export const DefaultEditorDebugSettings: DebugSettings = {
    isEditingMode: true,
    displayEditorFeatures: true,
    moveableCamera: true,
    pauseSimulation: true,
    displayPerformanceStats: false,
}

const DebugSettingsContext = createContext<DebugSettings>(DefaultPlayDebugSettings);

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
export function useDebugSettings(): DebugSettings {
    return useContext(DebugSettingsContext);
}