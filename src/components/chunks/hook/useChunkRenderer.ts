import {useEffect, useState} from "react";
import {JointModel} from "../model/JointModel";
import * as React from "react";
import {Vector3, Vector3Like} from "three";
import {deserializeComponent} from "../../util/componentSerializer";
import {NewChunk} from "../NewChunk";
import {allBlocks} from "../../blocks/allBlocks";
import {RenderedChunk} from "../model/RenderedChunk";

type RenderTask = {
    current: string,
    parent: string|null,
    distance: number,
    updated: number,
}

export function useChunkRenderer(
    rootChunk: string
) {
    const [renderTasks, setRenderTasks]
        = useState<RenderTask[]>([])
    const [renderedChunks, setRenderedChunks]
        = useState<{[key: string]: RenderedChunk}>({})

    // reset pipeline and start render job if current chunk changes
    useEffect(() => {
        setRenderTasks([{
            current: rootChunk,
            parent: null,
            distance: 1, // TODO ich möchte die distance nach den Joints richten!
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
        // TODO ich mag diese Funktion nicht, da sie die Update/Visibility Logik enthält
        // TODO ich würde die Funktion so aufteilen, sodass die mir nur den Chunk erstellt, und bedingt nur bei Bedarf aufrufe
        getUpdatedCurrentChunk(renderTask, renderedChunks)
            .then((currentChunk) => {
                // add or replace chunk to rendered chunks
                setRenderedChunks({
                    ...renderedChunks,
                    [renderTask.current]: {
                        ...currentChunk,
                        updated: renderTask.updated,
                        visible: renderTask.distance >= 0,
                        // TODO reicht das aus oder soll bei Distance null der Chunk unsichtbar aber mit ihren Hitboxen da sein?
                    }
                });

                // iterate through joints and add to the queue
                currentChunk.component.props.joints.forEach((joint: JointModel) => {
                    // skip if neighbour is already updated
                    if (renderedChunks[joint.neighbour]?.updated === renderTask.updated) {
                        return;
                    }

                    // add render task to queue
                    // TODO ich möchte noch die Joints so bearbeiten, dass sie die distance vorgeben!
                    renderTasks.push({
                        current: joint.neighbour,
                        parent: renderTask.current,
                        updated: renderTask.updated,
                        distance: renderTask.distance - 1,
                    });
                })
                setRenderTasks([
                    ...renderTasks,
                ])
            })
    },[renderTasks]);

    return renderedChunks;
}

// TODO ich mag diese Funktion nicht, da sie die Update/Visibility Logik enthält
// TODO ich würde die Funktion so aufteilen, sodass die mir nur den Chunk erstellt, und bedingt nur bei Bedarf aufrufe
async function getUpdatedCurrentChunk(
    renderTask: RenderTask,
    renderedChunks: {[key: string]: RenderedChunk}
): Promise<RenderedChunk> {
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
    } as RenderedChunk;
}

async function fetchChunkComponent(
    chunkName: string
): Promise<React.ReactElement<any>> {
    const url = window.location.origin + '/chunk/' + chunkName + '.json'
    const response = await fetch(url);
    const chunkData = await response.text();
    return deserializeChunk(chunkData);
}

function deserializeChunk(
    chunkData: string
) {
    // deserialize string to react component
    return deserializeComponent(chunkData, {
        components: {
            ...allBlocks,
            [NewChunk.name]: NewChunk as React.ComponentType,
        }
    });
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
