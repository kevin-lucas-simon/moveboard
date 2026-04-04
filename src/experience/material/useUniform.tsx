import {useEffect, useMemo} from "react";
import * as TSL from 'three/tsl';

/**
 * Note:
 * This custom hook differs from the useUniform() provided by @react-rapier.
 * The @react-rapier implementation manages uniforms globally by key, which can cause conflicts.
 * This implementation ensures component-level isolation to prevent such issues.
 */
export function useUniform<T>(value: T,) {
    const uniform = useMemo(() => TSL.uniform(value), []);

    useEffect(() => {
        uniform.value = value as any;
    }, [value, uniform]);

    return uniform;
}
