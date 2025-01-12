import {createContext, useContext} from "react";

export type DebugSettings = {
    stats: boolean,
    gizmo: boolean,
    camera: boolean,
    visible_joint: boolean,
    visible_barrier: boolean,
}
export const DefaultDebugSettings: DebugSettings = {
    stats: false,
    gizmo: false,
    camera: false,
    visible_joint: false,
    visible_barrier: false,
}

const DebugSettingsContext = createContext<DebugSettings>(DefaultDebugSettings);

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