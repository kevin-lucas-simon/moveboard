import {useEffect, useMemo} from "react";
import * as TSL from 'three/tsl';

export function useUniform<T>(value: T,) {
    const uniform = useMemo(() => TSL.uniform(value), []);

    useEffect(() => {
        uniform.value = value as any;
    }, [value, uniform]);

    return uniform;
}
