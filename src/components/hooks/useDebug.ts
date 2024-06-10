import { useMemo } from "react";
import {useLocalStorage} from "./useLocalStorage";

export type DebugSettings = {
    active: boolean,
    stats: boolean,
    gizmo: boolean,
    camera: boolean,
    joint: boolean,
    ceiling: boolean,
}
export const DefaultDebugSettings: DebugSettings = {
    active: false,
    stats: true,
    gizmo: true,
    camera: true,
    joint: true,
    ceiling: true,
}

/**
 * Hook to get the debug settings from local storage
 */
export function useDebug() {
    const [config] = useLocalStorage<DebugSettings>('DEBUG', DefaultDebugSettings);

    return useMemo(() => {
        return config.active ? config : null
    }, [config]);
}