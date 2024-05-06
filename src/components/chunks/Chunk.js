import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {Vector3} from "three";
import {useLevelContext} from "./Level";
import {DebugJointBlock} from "../blocks/DebugJointBlock.tsx";

const ChunkContext = createContext({});
export const useChunk = () => useContext(ChunkContext);

export const ChunkType = {
    BLOCK: 'normal',
};

export const Chunk = ({ name, joints, type = ChunkType.BLOCK, children }) => {
    const [worldPosition, setWorldPosition] = useState(new Vector3(0,0,0))

    const levelContext = useLevelContext()

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
        const ourPositionOffsetByJoint = joints[levelContext.value.activeChunk]?.position ?? new Vector3(0,0,0)

        setWorldPosition(new Vector3()
            .copy(worldPositionByJoint)
            .sub(ourPositionOffsetByJoint)
        )
    }, [joints, levelContext.value.activeChunk, levelContext.value.renderedChunks])

    return (
        <ChunkContext.Provider value={{
            variables: {
                position: worldPosition,
            },
        }}>
            {joints.map(joint =>
                <DebugJointBlock
                    key={name+joint.neighbour}
                    position={new Vector3().copy(joint.position ?? new Vector3(0,0,0)).add(worldPosition)}
                    dimension={joint.dimension ?? new Vector3(1,1,1)}
                />
            )}
            {levelContext.value.renderedChunks[name] &&
                children
            }
        </ChunkContext.Provider>
    );
};
