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
        fetchChunkData(currentChunk)
            .then(chunkData => {
                // deserialize chunk data
                const deserializedChunk = deserializeChunk(chunkData);

                // set deserialized chunk to rendered chunks
                setRenderedChunks({
                    [currentChunk]: {
                        component: deserializedChunk,
                        position: {x: 0, y: 0, z: 0}
                    }
                });

                deserializedChunk.props.joints.forEach((joint: JointModel) => {
                    fetchChunkData(joint.neighbour)
                        .then(neighbourChunkData => {
                            // deserialize chunk data
                            const neighbourChunk = deserializeChunk(neighbourChunkData);

                            // find joint of neighbour chunk
                            const neighbourJoint = neighbourChunk.props.joints.find(
                                (joint: JointModel) => joint.neighbour === currentChunk
                            );

                            // set position of neighbour chunk
                            const neighbourPosition = new Vector3()
                                .copy(joint.position)
                                .sub(neighbourJoint.position)
                            ;

                            // set deserialized chunk to rendered chunks
                            setRenderedChunks(prevChunks => ({
                                ...prevChunks,
                                [joint.neighbour]: {
                                    component: neighbourChunk,
                                    position: neighbourPosition
                                }
                            }));
                        });
                });
            });
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