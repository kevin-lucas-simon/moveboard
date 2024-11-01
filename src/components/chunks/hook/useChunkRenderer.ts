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
            distance: 0, // TODO joint logic
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
                    visible: renderTask.distance >= 0,
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
            [NewChunk.name]: NewChunk as React.ComponentType,
        }
    });

    // calculate world position for current chunk, root chunk has no parent
    let worldPosition = {x:0,y:0,z:0};
    if (renderTask.parent && renderedChunks[renderTask.parent]) {
        worldPosition = calculateWorldpositionFromParent(renderTask, chunkComponent, renderedChunks[renderTask.parent]);
    }

    // return created rendered chunk with some technical default values
    return {
        component: chunkComponent,
        position: worldPosition,
        updated: 0,
        visible: false,
    } as RenderedChunk;
}

function createRenderTasksOfChunkJoints(
    renderTask: RenderTask,
    currentChunk: RenderedChunk,
    renderedChunks: {[key: string]: RenderedChunk},
): RenderTask[] {

    console.log(currentChunk, renderTask, renderedChunks)

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
            distance: renderTask.distance - 1, // TODO ich möchte noch die Joints so bearbeiten, dass sie die distance vorgeben!
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
