import {useMemo} from 'react';
import {Vector3, Vector3Like} from 'three';
import {useChunkContext} from "../chunks/Chunk";

/**
 * Create a Vector3 object from a Vector3Like object
 * @param input
 */
export function useVector3(input: Vector3Like): Vector3 {
    return useMemo(() => new Vector3(input.x, input.y, input.z), [input.x, input.y, input.z]);
}

/**
 * Get the world position of a rendered chunk with block position as offset
 * @param blockPosition
 */
export function useWorldPosition(blockPosition: Vector3Like): Vector3 {
    const chunkContext = useChunkContext();

    const chunkPositionVector = useVector3(chunkContext?.position ?? {x: 0, y: 0, z: 0});
    const blockPositionVector = useVector3(blockPosition);

    return useMemo(() => {
        return chunkPositionVector.clone().add(blockPositionVector);
    }, [chunkPositionVector, blockPositionVector]);
}