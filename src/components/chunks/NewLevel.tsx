import {deserialize} from "../serializer/serialize";
import {BasicBlock} from "../blocks/BasicBlock";
import * as React from "react";
import {FloorBlock} from "../blocks/FloorBlock";
import {BarrierBlock} from "../blocks/BarrierBlock";
import {WallWithHoleStructure} from "../../data/TestLevel/structure/WallWithHoleStructure";
import {BouncerBlock} from "../blocks/BouncerBlock";
import {NewChunk} from "./NewChunk";
import {OrbitControls} from "@react-three/drei";
import {createContext, useEffect, useState} from "react";
import {Vector3, Vector3Like} from "three";
import {JointModel} from "../model/JointModel";
export const NewLevelContext = createContext<{[key: string]: RenderedChunk}>({});
export type RenderedChunk = {
    component: any,
    position: Vector3Like,
}

export type NewLevelProps = {
    startChunk: string,
}

export function NewLevel(props: NewLevelProps) {
    const [activeChunk, setActiveChunk]
        = useState<string>(props.startChunk);
    const renderedChunks= useRenderChunks(activeChunk);

    useEffect(() => {
        setActiveChunk(props.startChunk);
    }, [props.startChunk]);

    return (
        <>
            <NewLevelContext.Provider value={renderedChunks}>
                {/* TODO key in Objekte integrieren! */}
                {Object.keys(renderedChunks).map((key) => renderedChunks[key].component)}
            </NewLevelContext.Provider>

            {/* TODO yoo die Kamera soll einfach die Maße vom aktiven Chunk bekommen und danach sich ausrichten, fertig */}
            <OrbitControls />
            <BasicBlock position={{x:0,y:0,z:0}} dimension={{x:0.5,y:1.5,z:0.5}} color={"pink"} />
        </>
    );
}

function useRenderChunks(currentChunk: string) {
    // state for rendered chunks
    const [renderedChunks, setRenderedChunks]
        = useState<{[key: string]: RenderedChunk}>({})

    // fetch chunk data
    useEffect(() => {
        recursiveRendering(currentChunk, null, renderedChunks, setRenderedChunks);
    }, [currentChunk]);

    return renderedChunks;
}

function fetchChunkData(chunkName: string): Promise<string|undefined> {
    // download chunk data
    return fetch(window.location.origin+'/chunk/'+chunkName+'.json')
        .then((response) => response.text())
}

function deserializeChunk(chunkData: string|undefined) {
    // validate if string format
    if (typeof chunkData !== "string") {
        throw new Error("Chunk data is not a string");
    }

    // deserialize string to react component
    const deserializedChunk = deserialize(chunkData, {
        components: {
            [NewChunk.name]: NewChunk as React.ComponentType,
            [BasicBlock.name]: BasicBlock as React.ComponentType,
            [FloorBlock.name]: FloorBlock as React.ComponentType,
            [BarrierBlock.name]: BarrierBlock as React.ComponentType,
            [WallWithHoleStructure.name]: WallWithHoleStructure as React.ComponentType,
            [BouncerBlock.name]: BouncerBlock as React.ComponentType,
        }
    });

    // validate deserialization
    if (typeof deserializedChunk !== "object") {
        throw new Error("Deserialized Chunk is not an object");
    }

    // return deserialized chunk
    return deserializedChunk;
}

function recursiveRendering(
    currentChunkName: string,
    previousChunkName: string|null,
    renderedChunks: {[key: string]: RenderedChunk},
    setRenderedChunks: (chunks: {[key: string]: RenderedChunk}) => void,
) {
    fetchChunkData(currentChunkName)
        .then(chunkData => {
            // deserialize chunk data
            const currentChunk = deserializeChunk(chunkData);

            // calculate position of chunk
            let worldPosition = {x: 0, y: 0, z: 0};
            if (previousChunkName) {
                // get previous chunk
                const previousChunk = renderedChunks[previousChunkName];

// TODO Problem ist dieses hier, die Hook muss einmal durchlaufen, bevor ich mit der nächsten Anfrage beginnen kann
                if (!previousChunk) {
                    throw new Error("Previous chunk not found: " + previousChunkName);
                }

                // find joint of previous chunk
                const previousChunkJoint = previousChunk.component.props.joints.find(
                    (joint: JointModel) => joint.neighbour === currentChunkName
                );

                // find joint of current chunk
                const currentChunkJoint = currentChunk.props.joints.find(
                    (joint: JointModel) => joint.neighbour === previousChunkName
                );

                // set world position for current chunk
                worldPosition = new Vector3()
                    .copy(previousChunk.position)
                    .add(previousChunkJoint.position)
                    .sub(currentChunkJoint.position)
                ;
            }

            // add chunk to rendered chunks
// TODO Problem ist dieses hier, die Hook muss einmal durchlaufen, bevor ich mit der nächsten Anfrage beginnen kann
            setRenderedChunks({
                ...renderedChunks,
                [currentChunkName]: {
                    component: currentChunk,
                    position: worldPosition
                }
            });

            // recursive rendering for neighbours
            currentChunk.props.joints.forEach((joint: JointModel) => {
                // skip if neighbour is previous chunk
                if (joint.neighbour === previousChunkName) {
                    return;
                }

                // skip if neighbour is already rendered
                if (renderedChunks[joint.neighbour]) {
                    return;
                }

                // start rendering for neighbour
                recursiveRendering(joint.neighbour, currentChunkName, renderedChunks, setRenderedChunks);
            });
        })
    ;
}