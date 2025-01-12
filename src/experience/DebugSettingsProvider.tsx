import {createContext, useContext} from "react";

export type DebugSettings = {
    displayStats: boolean,
    displayGizmo: boolean,
    moveableCamera: boolean,
    visibleJoint: boolean,
    visibleBarrier: boolean,
}
export const DebugSettingsDefault: DebugSettings = {
    displayStats: false,
    displayGizmo: false,
    moveableCamera: false,
    visibleJoint: false,
    visibleBarrier: false,
}

const DebugSettingsContext = createContext<DebugSettings>(DebugSettingsDefault);

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