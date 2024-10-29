import {JointModel} from "../model/JointModel";
import {createContext, ReactNode} from "react";
import {Vector3Like} from "three";

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
    return (
        <NewChunkContext.Provider value={{
            position: {x: 0, y: 0, z: 0}
        }}>
            {props.children}
        </NewChunkContext.Provider>
    );
}
