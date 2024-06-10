import {Vector3} from "three";
import {useLevelContext} from "../chunks/Level";
import {useChunkContext} from "../chunks/Chunk";
import {useEffect, useState} from "react";

/**
 * Hook to get the world position of a rendered chunk with optional offset
 * @param offset
 */
export function useChunkPosition(offset?: Vector3|undefined) {
    const levelContext = useLevelContext()
    const chunkContext = useChunkContext()

    const [positionOffset, setPositionOffset] = useState(offset ?? new Vector3())
    useEffect(() => setPositionOffset(offset ?? new Vector3()), [offset]);

    const [worldPosition, setWorldPosition] = useState<Vector3|null>(null)
    useEffect(() => {
        if (!levelContext || !chunkContext) {
            return
        }

        const chunkName = chunkContext.chunk.name
        const chunkPosition = levelContext.renderedChunkPositions[chunkName]

        if (!chunkPosition) {
            return
        }

        setWorldPosition(new Vector3().copy(chunkPosition).add(positionOffset))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [positionOffset, chunkContext?.chunk.name, levelContext?.renderedChunkPositions])

    return worldPosition
}