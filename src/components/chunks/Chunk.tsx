import {JointModel} from "./model/JointModel";
import {createContext, ReactNode, useContext} from "react";
import {Vector3Like} from "three";
import {Joint} from "./Joint";
import {useLevelContext} from "./Level";

const ChunkContext = createContext<ChunkContextType|undefined>(undefined);
export type ChunkContextType = {
    position: Vector3Like,
    active: boolean,
}

export type ChunkProps = {
    name: string,
    joints: JointModel[],
    children?: ReactNode | undefined,
}
export function Chunk(props: ChunkProps) {
    // get chunk context from level
    const levelContext = useLevelContext();
    const chunkContext = levelContext.renderedChunks[props.name];
    if (!chunkContext) {
        throw new Error("Chunk context not found: " + props.name);
    }

    // check if chunk should be rendered
    if (!chunkContext.visible) {
        return <></>;
    }

    return (
        <ChunkContext.Provider value={{
            position: chunkContext.position,
            active: props.name === levelContext.activeChunk,
        }}>
            {props.joints.map((joint: JointModel) =>
                <Joint
                    key={props.name+joint.neighbour}
                    joint={joint}
                />
            )}
            {props.children}
        </ChunkContext.Provider>
    );
}

export function useChunkContext() {
    const context = useContext(ChunkContext);
    if (!context) {
        throw new Error("Chunk context not found. Are you using the Chunk component?");
    }
    return context;
}
