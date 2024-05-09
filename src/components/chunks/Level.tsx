import {createContext, ReactNode, useContext, useCallback, useEffect, useState, Ref} from "react";
import {Vector3} from "three";
import {ChunkModel} from "../model/ChunkModel";
import {JointModel} from "../model/JointModel";

const LevelContext = createContext<LevelContextType|undefined>(undefined);
export type LevelContextType = {
    function: {
        registerChunk: (chunk: ChunkModel) => void,
    }
    activeChunk: string,
    renderedChunkPositions: {[key: string]: Vector3},
}
export const useLevelContext = () => useContext(LevelContext);

export type LevelProps = {
    start: string,
    children?: ReactNode | undefined,
}

export const Level = (props: LevelProps) => {
    const [chunks, registerChunk] = useChunkRegister();
    const [activeChunkName, setActiveChunkName] = useState(props.start)

    const renderedChunkPositions = useRenderChunkPositions(chunks, activeChunkName)

    return (
        <LevelContext.Provider value={{
            function: {
                registerChunk: registerChunk,
            },
            activeChunk: activeChunkName,
            renderedChunkPositions: renderedChunkPositions,
        }}>
            {props.children}
        </LevelContext.Provider>
    );
};

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
    }, [activeChunkName, chunks])

    return renderedChunkPositions
}