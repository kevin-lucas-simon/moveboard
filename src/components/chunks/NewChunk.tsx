import {JointModel} from "../model/JointModel";
import {createContext, ReactNode, useContext} from "react";
import {Vector3Like} from "three";
import {NewLevelContext} from "./NewLevel";

export const NewChunkContext = createContext<NewChunkContextType|undefined>(undefined);
export type NewChunkContextType = {
    position: Vector3Like
}

export type NewChunkProps = {
    name: string,
    joints: JointModel[],
    children?: ReactNode | undefined,
}
export function NewChunk(props: NewChunkProps) {
    const chunkContext = useContext(NewLevelContext)[props.name];
    if (!chunkContext) {
        throw new Error("Chunk context not found: " + props.name);
    }

    return (
        <NewChunkContext.Provider value={{
            position: chunkContext.position,
        }}>
            {props.children}
        </NewChunkContext.Provider>
    );
}
