import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {Vector3} from "three";

const LevelContext = createContext({});
export const useLevelContext = () => useContext(LevelContext);
export const Level = ({start, children}) => {
    const [chunks, setChunks] = useState({})
    const [activeChunkName, setActiveChunkName] = useState(start)
    const [renderedChunks, setRenderedChunks] = useState({})

    // let all belonging chunks register here
    const registerChunk = useCallback(chunk => {
        setChunks(prevChunks => ({
            ...prevChunks,
            [chunk.name]: chunk
        }));
    }, [])

    useEffect(() => {
        console.log("Level", {
            chunks: chunks,
            activeChunkName: activeChunkName,
            renderedChunks: renderedChunks,
        })
    })

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
        (activeChunk?.joints ?? []).forEach(activeJoint => {
            newRenderedChunks[activeJoint.neighbour] = new Vector3()
                .copy(newRenderedChunks[activeChunkName])
                .add(activeJoint.position)
                .sub(chunks[activeJoint.neighbour].joints.find(x => x.neighbour === activeChunkName).position)
        })

        // return defined chunks for rendering
        setRenderedChunks(newRenderedChunks)
    }, [activeChunkName, chunks])

    // provide render information to corresponding chunk children
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
            {children}
        </LevelContext.Provider>
    );
};
