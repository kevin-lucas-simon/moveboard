import {useEffect, useState} from "react";
import {JointModel} from "../model/JointModel";
import * as React from "react";
import {Vector3, Vector3Like} from "three";
import {deserializeComponent} from "../../util/componentSerializer";
import {Chunk} from "../Chunk";
import {allBlocks} from "../../blocks/allBlocks";
import {RenderedChunk, RenderedChunkDimension} from "../model/RenderedChunk";
import {FloorBlock} from "../../blocks/FloorBlock";

type RenderTask = {
    current: string,
    parent: string|null,
    vision: number,
    updated: number,
}

export function useChunkRenderer(
    rootChunk: string
): {[key: string]: RenderedChunk} {
    const [renderTasks, setRenderTasks]
        = useState<RenderTask[]>([])
    const [renderedChunks, setRenderedChunks]
        = useState<{[key: string]: RenderedChunk}>({})

    // reset pipeline and start render job if current chunk changes
    useEffect(() => {
        setRenderTasks([{
            current: rootChunk,
            parent: null,
            vision: Number.MAX_SAFE_INTEGER,
            updated: Date.now(),
        }])
    }, [rootChunk]);

    // process render tasks
    useEffect(() => {
        // take first task from pipeline queue
        const renderTask = renderTasks.shift();
        if (!renderTask) {
            return;
        }
        setRenderTasks(renderTasks);

        // process render task asynchronously
        const processRenderTask = async () => {
            // get or create current chunk
            const currentChunk = renderedChunks[renderTask.current] ?? await createRenderedChunk(renderTask, renderedChunks);

            // update rendered chunk visibility
            setRenderedChunks(renderedChunks => ({
                ...renderedChunks,
                [renderTask.current]: {
                    ...currentChunk,
                    updated: renderTask.updated,
                    visible: renderTask.vision > 0,
                },
            }));

            // create new render tasks for joints
            const nextRenderTasks = createRenderTasksOfChunkJoints(renderTask, currentChunk, renderedChunks);
            setRenderTasks([
                ...renderTasks,
                ...nextRenderTasks,
            ]);
        };
        processRenderTask();
    }, [renderTasks]);

    return renderedChunks;
}

async function createRenderedChunk(
    renderTask: RenderTask,
    renderedChunks: {[key: string]: RenderedChunk},
): Promise<RenderedChunk> {
    // fetch chunk data string from API
    const fetchURL = window.location.origin + '/chunk/' + renderTask.current + '.json';
    const fetchResponse = await fetch(fetchURL);
    const fetchData = await fetchResponse.text();

    // deserialize data string to react component
    const chunkComponent = deserializeComponent(fetchData, {
        components: {
            ...allBlocks,
            [Chunk.name]: Chunk as React.ComponentType,
        }
    });

    // calculate world position and dimension for current chunk, root chunk has no parent
    const chunkDimension = calculateCameraDimension(chunkComponent);
    let chunkPosition = {x:0,y:0,z:0};
    if (renderTask.parent && renderedChunks[renderTask.parent]) {
        chunkPosition = calculateWorldpositionFromParent(renderTask, chunkComponent, renderedChunks[renderTask.parent]);
    }

    // return created rendered chunk with some technical default values
    return {
        component: chunkComponent,
        position: chunkPosition,
        dimension: chunkDimension,
        updated: 0,
        visible: false,
    } as RenderedChunk;
}

function createRenderTasksOfChunkJoints(
    renderTask: RenderTask,
    currentChunk: RenderedChunk,
    renderedChunks: {[key: string]: RenderedChunk},
): RenderTask[] {
    // iterate through joints and add to the queue
    const newRenderTasks: RenderTask[] = []
    currentChunk.component.props.joints.forEach((joint: JointModel) => {
        // skip if neighbour is already updated
        if (renderedChunks[joint.neighbour]?.updated === renderTask.updated) {
            return;
        }

        // add render task to queue
        newRenderTasks.push({
            current: joint.neighbour,
            parent: renderTask.current,
            updated: renderTask.updated,
            vision: Math.min(renderTask.vision - 1, joint.vision),
        });
    })

    return newRenderTasks;
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

function calculateCameraDimension(
    renderComponent: React.ReactElement<any>,
): RenderedChunkDimension {
    const minPosition = new Vector3(Infinity, Infinity, Infinity);
    const maxPosition = new Vector3(-Infinity, -Infinity, -Infinity);

    // iterate through component children
    renderComponent.props.children.forEach((child: React.ReactElement<any>) => {
        // skip if not a floor block
        if (child.type !== FloorBlock) {
            return;
        }

        // extract position and dimension from child
        const childPosition = child.props.position as Vector3;
        const childDimension = child.props.dimension as Vector3;
        if (!childPosition || !childDimension) {
            throw new Error("Missing props in " + child.type + ": position and dimension");
        }

        // calculate minimal and maximal position
        minPosition.x = Math.min(minPosition.x, childPosition.x - childDimension.x / 2);
        minPosition.y = Math.min(minPosition.y, childPosition.y - childDimension.y / 2);
        minPosition.z = Math.min(minPosition.z, childPosition.z - childDimension.z / 2);

        maxPosition.x = Math.max(maxPosition.x, childPosition.x + childDimension.x / 2);
        maxPosition.y = Math.max(maxPosition.y, childPosition.y + childDimension.y / 2);
        maxPosition.z = Math.max(maxPosition.z, childPosition.z + childDimension.z / 2);
    });

    // calculate new dimension and return it
    const dimension = maxPosition.clone().sub(minPosition);
    return {
        dimension: dimension,
        minimalPosition: minPosition,
        maximalPosition: maxPosition,
    } as RenderedChunkDimension;
}