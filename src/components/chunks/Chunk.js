import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {Vector3} from "three";
import {useLevelContext} from "./Level";

const ChunkContext = createContext({});
export const useChunk = () => useContext(ChunkContext); // TODO vlt aufsplitten in useChunkPosition und andere Dinge?

export const ChunkType = {
    BLOCK: 'normal',
};

export const Chunk = ({ name, type = ChunkType.BLOCK, children }) => {
    const [joints, setJoints] = useState([])
    const [position, setPosition] = useState(new Vector3(0,0,0))

    const levelContext = useLevelContext()

    const registerJoint = useCallback((joint) => {
        setJoints(previousState => [...previousState, joint])
    }, [])

    // register chunk on level
    useEffect(() => {
        if (!name) {
            console.error("Chunk: name is missing!")
        }
        levelContext.function.registerChunk({
            name: name,
            joints: joints,
        })
    }, [name, joints])

    // align self to given joint connection
    useEffect(() => {
        const worldPositionByJoint = levelContext.value.renderedChunks[name] ?? new Vector3(0,0,0)
        const ourPositionOffsetByJoint = joints
            .find(joint => joint.neighbour === levelContext.value.activeChunk)?.position ?? new Vector3(0,0,0)

        setPosition(new Vector3()
            .copy(worldPositionByJoint)
            .sub(ourPositionOffsetByJoint)
        )
    }, [joints, levelContext.value.activeChunk, levelContext.value.renderedChunks])

    return (
        <ChunkContext.Provider value={{
            variables: {
                position: position,
            },
            function: {
                registerJoint: registerJoint
            }
        }}>
            {levelContext.value.renderedChunks[name] &&
                children
            }
            {/*{children}*/}
        </ChunkContext.Provider>
    );
};
