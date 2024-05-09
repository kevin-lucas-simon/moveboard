import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {Vector3} from "three";
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

function useRegisteredChunkOnLevel(props: ChunkProps): ChunkModel {
    const levelChunkRegisterFunction = useLevelContext()?.function.registerChunk

    const [registeredChunk, setRegisteredChunk] = useState<ChunkModel>({
        name: props.name,
        joints: props.joints,
    })

    useEffect(() => {
        if (typeof levelChunkRegisterFunction !== "function") {
            throw new Error(useRegisteredChunkOnLevel.name + "must be within " + Level.name)
        }
        setRegisteredChunk({
            name: props.name,
            joints: props.joints,
        })
        levelChunkRegisterFunction(registeredChunk)
    }, [levelChunkRegisterFunction, props, registeredChunk]);

    return registeredChunk
}

function useChunkVisibility(chunkName: string) {
    const levelContext = useLevelContext()

    if (!levelContext) {
        return false
    }

    return levelContext.value.renderedChunkPositions[chunkName]
}

export function useChunkWorldPosition(offset?: Vector3|undefined) {
    const levelContext = useLevelContext()
    const chunkContext = useChunkContext()

    const [positionOffset, setPositionOffset] = useState(offset ?? new Vector3())
    useEffect(() => setPositionOffset(offset ?? new Vector3()), [offset]);

    const [worldPosition, setWorldPosition] = useState(positionOffset)
    useEffect(() => {
        if (!levelContext || !chunkContext) {
            return
        }

        const chunkName = chunkContext.chunk.name
        const chunkPosition = levelContext.value.renderedChunkPositions[chunkName] // TODO umsetzen in .position!

        if (!chunkPosition) {
            return
        }

        setWorldPosition(new Vector3().copy(chunkPosition).add(positionOffset))
    }, [positionOffset, chunkContext?.chunk.name, levelContext?.value.renderedChunkPositions])

    return worldPosition
}