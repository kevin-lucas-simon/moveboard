import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {Level, useLevelContext} from "./Level";
import {Joint} from "./Joint";
import {JointModel} from "../model/JointModel";
import {ChunkModel} from "../model/ChunkModel";

const ChunkContext = createContext<ChunkContextType|undefined>(undefined);
export type ChunkContextType = {
    chunk: ChunkModel,
}
export const useChunkContext = () => useContext(ChunkContext);

export type ChunkProps = {
    name: string,
    joints: JointModel[],
    children?: ReactNode | undefined,
}

/**
 * Chunk component to group blocks together and define joints to other chunks
 * @param props
 * @constructor
 */
export const Chunk = (props: ChunkProps) => {
    const registeredChunkOnLevel = useRegisteredChunkOnLevel(props)
    const isRendering = useChunkVisibility(props.name)

    return (
        <ChunkContext.Provider value={{
            chunk: registeredChunkOnLevel,
        }}>
            {isRendering && props.joints.map((joint: JointModel) =>
                <Joint
                    key={props.name+joint.neighbour}
                    joint={joint}
                />
            )}
            {isRendering &&
                props.children
            }
        </ChunkContext.Provider>
    );
};

/**
 * Register chunk on level and update on props change
 * @param props
 */
function useRegisteredChunkOnLevel(props: ChunkProps): ChunkModel {
    const levelChunkRegisterFunction = useLevelContext()?.function.registerChunk

    const [registeredChunk, setRegisteredChunk] = useState<ChunkModel>({
        name: props.name,
        joints: props.joints,
    })

    useEffect(() => {
        if (typeof levelChunkRegisterFunction !== "function") {
            throw new Error(useRegisteredChunkOnLevel.name + " must be within " + Level.name)
        }
        setRegisteredChunk({
            name: props.name,
            joints: props.joints,
        })
        levelChunkRegisterFunction(registeredChunk)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);

    return registeredChunk
}

/**
 * Hook to get the visibility of a chunk in the level
 * @param chunkName
 */
function useChunkVisibility(chunkName: string) {
    const levelContext = useLevelContext()

    if (!levelContext) {
        return false
    }

    return levelContext.renderedChunkPositions[chunkName]
}