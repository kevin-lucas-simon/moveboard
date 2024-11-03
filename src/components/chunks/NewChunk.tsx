import {JointModel} from "./model/JointModel";
import {createContext, ReactNode, useContext} from "react";
import {Vector3Like} from "three";
import {NewJoint} from "./NewJoint";
import {useNewLevelContext} from "./NewLevel";

const NewChunkContext = createContext<NewChunkContextType|undefined>(undefined);
export type NewChunkContextType = {
    position: Vector3Like,
    active: boolean,
}

export type NewChunkProps = {
    name: string,
    joints: JointModel[],
    children?: ReactNode | undefined,
}
export function NewChunk(props: NewChunkProps) {
    // get chunk context from level
    const levelContext = useNewLevelContext();
    const chunkContext = levelContext.renderedChunks[props.name];
    if (!chunkContext) {
        throw new Error("Chunk context not found: " + props.name);
    }

    // check if chunk should be rendered
    if (!chunkContext.visible) {
        return <></>;
    }

    return (
        <NewChunkContext.Provider value={{
            position: chunkContext.position,
            active: props.name === levelContext.activeChunk,
        }}>
            {props.joints.map((joint: JointModel) =>
                <NewJoint
                    key={props.name+joint.neighbour}
                    joint={joint}
                />
            )}
            {props.children}
            {/*<ChunkCamera*/}
            {/*    cameraFov={45}*/}
            {/*    transitionSeconds={0.5}*/}
            {/*    marginInBlockSize={1.0}*/}
            {/*/>*/}
        </NewChunkContext.Provider>
    );
}

export function useNewChunkContext() {
    const context = useContext(NewChunkContext);
    if (!context) {
        throw new Error("Chunk context not found. Are you using the Chunk component?");
    }
    return context;
}
