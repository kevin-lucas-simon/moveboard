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
    component: React.ReactElement<any>,
    position: Vector3Like,
    updated: number,
    visible: boolean,
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

// TODO Dokumentation Prinzip:
// Task-Pipeline wird nach und nach abgearbeitet
// Start nur mit current chunk
// Daten werden geladen und in rendered chunks gepackt
// Dabei wird auf Nachbar Chunks in den Joints geschaut
// Falls es Nachbarn gibt, werden diese in die Pipeline geschoben

type RenderTask = {
    current: string,
    parent: string|null,
    distance: number,
    updated: number,
}
function useRenderChunks(rootChunk: string) {
    const [renderTasks, setRenderTasks]
        = useState<RenderTask[]>([])
    const [renderedChunks, setRenderedChunks]
        = useState<{[key: string]: RenderedChunk}>({})

    // reset pipeline and start render job if current chunk changes
    useEffect(() => {
        setRenderTasks([{
            current: rootChunk,
            parent: null,
            distance: 1,
            updated: Date.now(),
        }])
    }, [rootChunk]);

    // render chunk objects
    useEffect(() => {
        // take first task from pipeline queue
        const renderTask = renderTasks.shift()
        if (!renderTask) {
            return
        }
        setRenderTasks(renderTasks)

        // get current chunk for render task
        getUpdatedCurrentChunk(renderTask, renderedChunks)
            .then((currentChunk) => {
                console.log(currentChunk.component.props.name, currentChunk.visible, renderTask.distance)

                // add or replace chunk to rendered chunks
                setRenderedChunks({
                    ...renderedChunks,
                    [renderTask.current]: currentChunk
                });

                // iterate through joints and add to the queue
                currentChunk.component.props.joints.forEach((joint: JointModel) => {
                    // skip if neighbour is already updated
                    if (renderedChunks[joint.neighbour]?.updated === renderTask.updated) {
                        return;
                    }

                    // add render task to queue
                    setRenderTasks([
                        ...renderTasks,
                        {
                            current: joint.neighbour,
                            parent: renderTask.current,
                            updated: renderTask.updated,
                            distance: renderTask.distance - 1,
                        }
                    ])
                })
            })
    },[renderTasks]);

    return renderedChunks;
}

async function getUpdatedCurrentChunk(renderTask: RenderTask, renderedChunks: {[key: string]: RenderedChunk}): Promise<RenderedChunk> {
    // get current chunk for render task
    const currentRendered = renderedChunks[renderTask.current]
    let currentComponent = currentRendered?.component
    let currentPosition = currentRendered?.position

    // create new chunk component by fetching from server
    if (!currentRendered) {
        currentComponent = await fetchChunkComponent(renderTask.current)
        currentPosition = {x:0,y:0,z:0}

        // calculate world position, for root chunk the world center is used
        if (renderTask.parent) {
            currentPosition = calculateWorldpositionFromParent(renderTask, currentComponent, renderedChunks[renderTask.parent])
        }
    }

    // update chunk timestamp and visibility
    return {
        component: currentComponent,
        position: currentPosition,
        updated: renderTask.updated,
        visible: renderTask.distance >= 0,
    } as RenderedChunk;
}

async function fetchChunkComponent(chunkName: string): Promise<React.ReactElement<any>> {
    const url = window.location.origin + '/chunk/' + chunkName + '.json'
    const response = await fetch(url);
    const chunkData = await response.text();
    return deserializeChunk(chunkData);
}

function calculateWorldpositionFromParent(
    renderTask: RenderTask,
    renderComponent: React.ReactElement<any>,
    parentChunk: RenderedChunk,
): Vector3Like {
    // find joint of parent chunk
    const previousChunkJoint = parentChunk.component.props.joints.find(
        (joint: JointModel) => joint.neighbour === renderTask.current
    );

    // find joint of render component
    const currentChunkJoint = renderComponent.props.joints.find(
        (joint: JointModel) => joint.neighbour === renderTask.parent
    );

    // calculate world position for current chunk
    return new Vector3()
        .copy(parentChunk.position)
        .add(previousChunkJoint.position)
        .sub(currentChunkJoint.position)
    ;
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
