import {Vector3} from "three";
import {useEffect, useState} from "react";
import {Level, useLevelContext} from "../chunks/Level";
import {Chunk, useChunkContext} from "../chunks/Chunk";
import {log} from "three/examples/jsm/nodes/math/MathNode";

export type ChunkDimensionBoundaries = {
    minimalPosition: Vector3,
    maximalPosition: Vector3,
}

/**
 * Rückgabe ausm Chunk/Level Context
 */
export function useChunkDimension() {
    const levelChunkDimensionList = useLevelContext()?.chunkDimensions
    const chunkName = useChunkContext()?.chunk.name
    const [chunkDimension, setChunkDimension] = useState<Vector3|undefined>(undefined)

    if (!levelChunkDimensionList) {
        throw new Error(useChunkDimension.name + " must be within " + Level.name + " with " + useChunkDimensionProvider.name)
    }
    if (!chunkName) {
        throw new Error(useChunkDimensionRegister.name + " must be within " + Chunk.name)
    }

    useEffect(() => {
        const levelChunkDimension = levelChunkDimensionList[chunkName]
        if (!levelChunkDimension) {
            setChunkDimension(new Vector3(0,0,0))
            return
        }
        setChunkDimension(levelChunkDimension.maximalPosition.clone().sub(levelChunkDimension.minimalPosition))
    }, [levelChunkDimensionList]);

    return chunkDimension
}

/**
 * Anmelde Schnittstelle für Elemente in Chunks
 */
export function useChunkDimensionRegister(minimalPosition: Vector3, maximalPosition: Vector3) {
    const chunkName = useChunkContext()?.chunk.name
    const registerBlockInChunkDimension = useLevelContext()?.function.registerBlockInChunkDimension

    useEffect(() => {
        if (!chunkName) {
            throw new Error(useChunkDimensionRegister.name + " must be within " + Chunk.name)
        }
        if (typeof registerBlockInChunkDimension !== "function") {
            throw new Error(useChunkDimensionRegister.name + " must be within " + Level.name)
        }
        registerBlockInChunkDimension(chunkName, minimalPosition, maximalPosition)
    }, [minimalPosition, maximalPosition])
}

/**
 * Provider Schnittstelle im Level
 */
export function useChunkDimensionProvider() {
    const [chunkDimensions, setChunkDimensions]
        = useState<{[key: string]: ChunkDimensionBoundaries}>({})

    function registerBlockInChunkDimension(chunkName: string, minimalChunkPosition: Vector3, maximalChunkPosition: Vector3) {
        // check if boundaries are valid
        if (minimalChunkPosition.x > maximalChunkPosition.x
            || minimalChunkPosition.y > maximalChunkPosition.y
            || minimalChunkPosition.z > maximalChunkPosition.z
        ) {
            throw new Error(registerBlockInChunkDimension.name + " minimalChunkPosition must be smaller than maximalChunkPosition")
        }

        // calculate and save it to chunk dimension list
        setChunkDimensions(prevChunkDimensions => {
            // get current dimension boundaries else create
            const chunkDimension = prevChunkDimensions[chunkName] ?? {
                minimalPosition: new Vector3(Infinity, Infinity, Infinity),
                maximalPosition: new Vector3(-Infinity, -Infinity, -Infinity),
            }

            // set new boundaries if size is bigger
            chunkDimension.minimalPosition.x = Math.min(chunkDimension.minimalPosition.x, minimalChunkPosition.x);
            chunkDimension.minimalPosition.y = Math.min(chunkDimension.minimalPosition.y, minimalChunkPosition.y);
            chunkDimension.minimalPosition.z = Math.min(chunkDimension.minimalPosition.z, minimalChunkPosition.z);

            chunkDimension.maximalPosition.x = Math.max(chunkDimension.maximalPosition.x, maximalChunkPosition.x);
            chunkDimension.maximalPosition.y = Math.max(chunkDimension.maximalPosition.y, maximalChunkPosition.y);
            chunkDimension.maximalPosition.z = Math.max(chunkDimension.maximalPosition.z, maximalChunkPosition.z);

            return {
            ...prevChunkDimensions,
            [chunkName]: chunkDimension
        }})
    }

    // TODO vlt refactor mit Provide anstatt klassische Rückgabe?
    return [chunkDimensions, registerBlockInChunkDimension] as const
}