import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {Vector3} from "three";
import {ChunkModel} from "../model/ChunkModel";
import {JointModel} from "../model/JointModel";
import {ChunkDimensionBoundaries, useChunkDimensionProvider} from "../hooks/useChunkDimension";
import {ChunkCamera} from "../render/ChunkCamera";

const LevelContext = createContext<LevelContextType|undefined>(undefined);
export type LevelContextType = {
    function: {
        registerChunk: (chunk: ChunkModel) => void,
        setActiveChunk: (chunkName: string) => void,
        registerBlockInChunkDimension: (chunkName: string, minimalChunkPosition: Vector3, maximalChunkPosition: Vector3) => void,
    }
    activeChunk: string,
    renderedChunkPositions: {[key: string]: Vector3},
    chunkDimensions: {[key: string]: ChunkDimensionBoundaries}
}
export const useLevelContext = () => useContext(LevelContext);

export type LevelProps = {
    start: string,
    children?: ReactNode | undefined,
}

/**
 * Level component to group all chunks together and define active chunk for rendering
 * @param props
 * @constructor
 */
export const Level = (props: LevelProps) => {
    const [chunks, registerChunk] = useChunkRegister();
    const [activeChunkName, setActiveChunk] = useActiveChunk(props.start)
    const renderedChunkPositions = useRenderChunkPositions(chunks, activeChunkName)
    const [chunkDimensions, registerBlockInChunkDimension] = useChunkDimensionProvider()

    // debug log
    useEffect(() => {
        console.log({
            activeChunkName: activeChunkName,
            chunks: chunks,
            renderedChunkPositions: renderedChunkPositions,
            chunkDimensions: chunkDimensions,
        })
    }, [chunks, renderedChunkPositions, activeChunkName, chunkDimensions]);

    return (
        <LevelContext.Provider value={{
            function: {
                registerChunk: registerChunk,
                setActiveChunk: setActiveChunk,
                registerBlockInChunkDimension: registerBlockInChunkDimension
            },
            activeChunk: activeChunkName,
            renderedChunkPositions: renderedChunkPositions,
            chunkDimensions: chunkDimensions,
        }}>
            {props.children}
            <ChunkCamera
                cameraFov={45}
                transitionSeconds={0.5}
                marginInBlockSize={1.0}
            />
        </LevelContext.Provider>
    );
};

/**
 * Hook to register chunks with their names in level
 */
function useChunkRegister() {
    // define all chunks
    const [chunks, setChunks]
        = useState<{[key: string]: ChunkModel}>({})

    // define chunk register hook
    const registerChunk = (chunk: ChunkModel) => {
        setChunks(prevChunks => ({
            ...prevChunks,
            [chunk.name]: chunk
        }))
    }

    return [chunks, registerChunk] as const
}

/**
 * Hook to get the rendered chunk positions for rendering
 * @param chunks
 * @param activeChunkName
 */
function useRenderChunkPositions(chunks: {[key: string]: ChunkModel}, activeChunkName: string) {
    const [renderedChunkPositions, setRenderedChunkPositions]
        = useState<{[key: string]: Vector3}>({})

    useEffect(() => {
        // get current active chunk
        const activeChunk = chunks[activeChunkName]
        if (!activeChunk && Object.keys(chunks).length !== 0) {
            throw Error(useRenderChunkPositions.name + " active chunk '" + activeChunkName + "' not found!")
        }

        // define render pipeline object
        const newRenderedChunks = {
            [activeChunkName]: renderedChunkPositions[activeChunkName] ?? new Vector3(0,0,0),
        };

        // get active chunk neighbours via joints
        (activeChunk?.joints ?? []).forEach((activeJoint: JointModel) => {
            newRenderedChunks[activeJoint.neighbour] = new Vector3()
                .copy(newRenderedChunks[activeChunkName])
                .add(activeJoint.position)
                .sub(chunks[activeJoint.neighbour].joints.find((joint: JointModel) => joint.neighbour === activeChunkName)?.position ?? new Vector3())
        })

        // return defined chunks for rendering
        setRenderedChunkPositions(newRenderedChunks)

        // eslint-disable-next-line
    }, [activeChunkName, chunks])

    return renderedChunkPositions
}

/**
 * Hook to get the active chunk name with initial chunk name to start
 * @param startChunkName
 */
function useActiveChunk(startChunkName: string) {
    const [activeChunkName, setActiveChunkName] = useState(startChunkName)

    function setActiveChunk(chunkName: string) {
        setActiveChunkName(chunkName)
    }

    return [activeChunkName, setActiveChunk] as const
}