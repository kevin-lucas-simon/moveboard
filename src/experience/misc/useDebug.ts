import { useMemo } from "react";
import {useLocalStorage} from "./useLocalStorage";

export type DebugSettings = {
    active: boolean,
    stats: boolean,
    gizmo: boolean,
    camera: boolean,
    visible_joint: boolean,
    visible_barrier: boolean,
}
export const DefaultDebugSettings: DebugSettings = {
    active: false,
    stats: true,
    gizmo: true,
    camera: true,
    visible_joint: true,
    visible_barrier: true,
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