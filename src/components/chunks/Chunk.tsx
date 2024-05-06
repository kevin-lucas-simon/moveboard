import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {Vector3} from "three";
import {useLevelContext} from "./Level";
import {DebugJointBlock} from "../blocks/DebugJointBlock";
import {JointModel} from "../model/JointModel";

const ChunkContext = createContext<ChunkContextType|null>(null);
export type ChunkContextType = {
    variables: {
        position: Vector3,
    }
}
export const useChunk = () => useContext(ChunkContext);

export type ChunkProps = {
    name: string,
    joints: JointModel[],
    children?: ReactNode | undefined,
}
export const Chunk = (props: ChunkProps) => {
    const [worldPosition, setWorldPosition]
        = useState(new Vector3(0,0,0))
    const levelContext
        = useLevelContext()

    // register chunk on level
    useEffect(() => {
        levelContext?.function.registerChunk({
            name: props.name,
            joints: props.joints,
        })
    }, [props.name, props.joints])

    // align self to given joint connection
    useEffect(() => {
        // @ts-ignore
        const worldPositionByJoint = levelContext.value.renderedChunks[props.name] ?? new Vector3(0,0,0)
        // @ts-ignore
        const ourPositionOffsetByJoint = props.joints[levelContext.value.activeChunk]?.position ?? new Vector3(0,0,0)

        setWorldPosition(new Vector3()
            .copy(worldPositionByJoint)
            .sub(ourPositionOffsetByJoint)
        )
    }, [props.joints, levelContext?.value.activeChunk, levelContext?.value.renderedChunks])

    return (
        <ChunkContext.Provider value={{
            variables: {
                position: worldPosition,
            }
        }}>
            {props.joints.map(joint =>
                <DebugJointBlock
                    key={props.name+joint.neighbour}
                    position={new Vector3().copy(joint.position ?? new Vector3(0,0,0)).add(worldPosition)}
                    dimension={joint.dimension ?? new Vector3(1,1,1)}
                />
            )}
            {levelContext?.value.renderedChunks[props.name] &&
                props.children
            }
        </ChunkContext.Provider>
    );
};
