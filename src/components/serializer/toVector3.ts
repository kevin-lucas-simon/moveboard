import { useMemo } from 'react';
import {Vector3, Vector3Like} from 'three';

export function useVector3(input: Vector3Like): Vector3 {
    return useMemo(() => new Vector3(input.x, input.y, input.z), [input.x, input.y, input.z]);
}