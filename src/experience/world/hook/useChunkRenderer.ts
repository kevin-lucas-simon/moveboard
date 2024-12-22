import {ChunkModel} from "../model/ChunkModel";
import {Vector3, Vector3Like} from "three";
import {useEffect, useState} from "react";
import {FloorBlockModel} from "../../element/block/FloorBlock";
import {JointModel} from "../model/JointModel";
import {GenericElementModel} from "../../element/GenericElement";

export type RenderedChunk = {
    id: string,
    model: ChunkModel,
    renderPosition: Vector3Like,
    renderDimension: RenderDimension,
    visible: boolean,
    updated: number,
}
type RenderDimension = {
    dimension: Vector3Like,
    minimalPosition: Vector3Like,
    maximalPosition: Vector3Like,
}
type RenderTask = {
    currentId: string,
    parentId: string|null,
    position: Vector3Like,
    vision: number,
    updated: number,
}

/**
 * Hook to render new chunks
 * @param chunkModels
 * @param activeChunkId
 */
export function useChunkRenderer(
    chunkModels: {[key: string]: ChunkModel},
    activeChunkId: string
): {[key: string]: RenderedChunk} {
    const [renderedChunks, setRenderedChunks]
        = useState<{[key: string]: RenderedChunk}>({})
    const [renderTasks, setRenderTasks]
        = useState<RenderTask[]>([])

    // reset render tasks for root chunk
    useEffect(() => {
        setRenderTasks([{
            currentId: activeChunkId,
            parentId: null,
            position: renderedChunks[activeChunkId]?.renderPosition ?? {x: 0, y: 0, z: 0},
            vision: Number.MAX_SAFE_INTEGER,
            updated: Date.now(),
        }])
    }, [activeChunkId, chunkModels]);

    // process render tasks
    useEffect(() => {
        // take first task from pipeline queue
        const renderTask = renderTasks.shift();
        if (!renderTask) {
            return;
        }

        // create render chunks and following tasks
        const currentChunk
            = renderedChunks[renderTask.currentId] ?? createRenderedChunk(renderTask, chunkModels);
        const nextRenderTasks
            = createRenderTasks(renderTask, currentChunk, renderedChunks);

        // update rendered chunk visibility
        setRenderedChunks(renderedChunks => ({
            ...renderedChunks,
            [renderTask.currentId]: {
                ...currentChunk, // TODO Aktualisierung von Position!
                updated: renderTask.updated,
                visible: renderTask.vision > 0,
            }
        }));
        // add new render tasks to the queue
        setRenderTasks([
            ...renderTasks,
            ...nextRenderTasks,
        ])
    }, [renderTasks]);

    return renderedChunks;
}

/**
 * Create a new rendered chunk
 * @param renderTask
 * @param chunkModels
 */
function createRenderedChunk(
    renderTask: RenderTask,
    chunkModels: {[key: string]: ChunkModel}
): RenderedChunk {
    // get chunk models
    const currentModel = chunkModels[renderTask.currentId];
    if (!currentModel) {
        throw new Error(`Chunk model ${renderTask.currentId} not found`);
    }

    // calculate dimension
    const renderDimension = calculateCameraDimension(currentModel.elements);

    // get joint with parent name
    const jointToParent
        = currentModel.joints.find(joint => joint.neighbour === renderTask.parentId);
    let renderPosition = new Vector3()
    if (jointToParent) {
        renderPosition = new Vector3()
            .copy(renderTask.position)
            .sub(jointToParent.position)
    }

    // return new created rendered chunk
    return {
        id: renderTask.currentId,
        model: currentModel,
        renderPosition: renderPosition,
        renderDimension: renderDimension,
        visible: renderTask.vision > 0,
        updated: renderTask.updated,
    } as RenderedChunk;
}

/**
 * Calculate the camera dimension based on FloorBlocks
 * @param elementModels
 */
function calculateCameraDimension(
    elementModels: GenericElementModel[],
): RenderDimension {
    const minPosition = new Vector3(Infinity, Infinity, Infinity);
    const maxPosition = new Vector3(-Infinity, -Infinity, -Infinity);

    // iterate through all camera related elements
    elementModels.forEach((element) => {
        // skip if not a floor block and cast to floor block model
        if (element.type !== "FloorBlock") {
            return;
        }
        const floorBlock = element as FloorBlockModel;

        // extract position and dimension from child
        const elementPosition = floorBlock.position;
        const elementDimension = floorBlock.dimension;
        if (!elementPosition || !elementDimension) {
            throw new Error("Missing props in " + element.type + ": position and dimension");
        }

        // calculate minimal and maximal position
        minPosition.x = Math.min(minPosition.x, elementPosition.x - elementDimension.x / 2);
        minPosition.y = Math.min(minPosition.y, elementPosition.y - elementDimension.y / 2);
        minPosition.z = Math.min(minPosition.z, elementPosition.z - elementDimension.z / 2);

        maxPosition.x = Math.max(maxPosition.x, elementPosition.x + elementDimension.x / 2);
        maxPosition.y = Math.max(maxPosition.y, elementPosition.y + elementDimension.y / 2);
        maxPosition.z = Math.max(maxPosition.z, elementPosition.z + elementDimension.z / 2);
    });

    // calculate new dimension and return it
    const dimension = maxPosition.clone().sub(minPosition);
    return {
        dimension: dimension as Vector3Like,
        minimalPosition: minPosition as Vector3Like,
        maximalPosition: maxPosition as Vector3Like,
    } as RenderDimension;
}

/**
 * Create new render tasks based on the current chunk joints
 * @param renderTask
 * @param currentChunk
 * @param renderChunks
 */
function createRenderTasks(
    renderTask: RenderTask,
    currentChunk: RenderedChunk,
    renderChunks: {[key: string]: RenderedChunk},
): RenderTask[] {
    // iterate through joints and add to the queue
    const newRenderTasks: RenderTask[] = []
    currentChunk.model.joints.forEach((joint: JointModel) => {
        // skip if neighbour is already updated
        if (renderChunks[joint.neighbour]?.updated === renderTask.updated) {
            return;
        }

        // calculate joint position
        const jointPosition = new Vector3()
            .copy(currentChunk.renderPosition)
            .add(joint.position)

        // add render task to queue
        newRenderTasks.push({
            currentId: joint.neighbour,
            parentId: renderTask.currentId,
            position: jointPosition,
            vision: Math.min(renderTask.vision - 1, joint.vision),
            updated: renderTask.updated
        });
    })

    return newRenderTasks
}