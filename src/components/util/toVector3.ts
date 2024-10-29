import {useContext, useMemo} from 'react';
import {Vector3, Vector3Like} from 'three';
import {NewChunkContext} from "../chunks/NewChunk";

export function useVector3(input: Vector3Like): Vector3 {
    return useMemo(() => new Vector3(input.x, input.y, input.z), [input.x, input.y, input.z]);
}

export function useWorldPosition(blockPosition: Vector3Like): Vector3 {
    const chunkContext = useContext(NewChunkContext);

    const chunkPositionVector = useVector3(chunkContext?.position ?? {x: 0, y: 0, z: 0});
    const blockPositionVector = useVector3(blockPosition);

    return useMemo(() => {
        const worldPosition = chunkPositionVector.clone().add(blockPositionVector)
        return worldPosition;
    }, [chunkPositionVector, blockPositionVector]);
}