import {createContext, ReactNode, useContext, useCallback, useEffect, useState} from "react";
import {Vector3} from "three";
import {ChunkModel} from "../model/ChunkModel";
import {JointModel} from "../model/JointModel";

const LevelContext = createContext<LevelContextType|null>(null);
export type LevelContextType = {
    value: {
        activeChunk: string,
        renderedChunks: {[key: string]: Vector3},
    },
    function: {
        registerChunk: (chunk: ChunkModel) => void
    }
}

export const useLevelContext = () => useContext(LevelContext);

export type LevelProps = {
    start: string,
    children?: ReactNode | undefined,
}
export const Level = (props: LevelProps) => {
    const [chunks, setChunks]
        = useState<{[key: string]: ChunkModel}>({})
    const [activeChunkName, setActiveChunkName]
        = useState(props.start)
    const [renderedChunks, setRenderedChunks]
        = useState<{[key: string]: Vector3}>({})

    // let all belonging chunks register here
    const registerChunk = useCallback((chunk: ChunkModel) => {
        setChunks(prevChunks => ({
            ...prevChunks,
            [chunk.name]: chunk
        }));
    }, [])

    // define rendered chunks
    useEffect(() => {
        // get current active chunk
        const activeChunk = chunks[activeChunkName]
        if (!activeChunk && Object.keys(chunks).length !== 0) {
            console.error("Level: active chunk '" + activeChunkName + "' not found!")
        }

        // define render pipeline object
        const newRenderedChunks = {
            [activeChunkName]: new Vector3(0,0,0),
        };

        // get active chunk neighbours via joints
        (activeChunk?.joints ?? []).forEach((activeJoint: JointModel) => {
            newRenderedChunks[activeJoint.neighbour] = new Vector3()
                .copy(newRenderedChunks[activeChunkName])
                .add(activeJoint.position)
                .sub(chunks[activeJoint.neighbour].joints.find((joint: JointModel) => joint.neighbour === activeChunkName)?.position ?? new Vector3())
        })

        // return defined chunks for rendering
        setRenderedChunks(newRenderedChunks)
    }, [activeChunkName, chunks])

    return (
        <LevelContext.Provider value={{
            value: {
                activeChunk: activeChunkName,
                renderedChunks: renderedChunks,
            },
            function: {
                registerChunk: registerChunk,
            }
        }}>
            {props.children}
        </LevelContext.Provider>
    );
};
