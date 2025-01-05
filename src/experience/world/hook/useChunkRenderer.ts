import {ChunkModel} from "../model/ChunkModel";
import {Vector3, Vector3Like} from "three";
import {FloorBlockModel} from "../../element/block/FloorBlock";
import {JointModel} from "../model/JointModel";
import {ElementModel} from "../model/ElementModel";
import {useMemo} from "react";

export type RenderedChunk = {
    id: string,
    model: ChunkModel,
    renderPosition: Vector3Like,
    renderDimension: RenderDimension,
}
type RenderDimension = {
    dimension: Vector3Like,
    minimalPosition: Vector3Like,
    maximalPosition: Vector3Like,
}

/**
 * Hook to calculate and filter visible chunks based on provided chunk models
 * @param chunkModels Chunk models from API
 * @param startChunkId Initial Chunk name is needed to prevent orphan chunk issues
 * @param activeChunkId Active chunk defines which chunks neighbours should be visible
 */
export function useChunkRenderer(
    chunkModels: {[key: string]: ChunkModel},
    startChunkId: string,
    activeChunkId: string
): {[key: string]: RenderedChunk} {
    // we only recalculate if the data changes
    const calculatedChunks = useMemo(() => {
        return calculateChunkGeometry(chunkModels, startChunkId);
    }, [chunkModels, startChunkId]);

    // we just filter our cached chunks
    return filterVisibleChunks(calculatedChunks, activeChunkId);
}

/**
 * Filter visible chunks based on active chunk
 * @param calculatedChunks Rendered chunks to filter
 * @param activeChunkId Active chunk where the vision starts
 */
function filterVisibleChunks(
    calculatedChunks: {[key: string]: RenderedChunk},
    activeChunkId: string
): {[key: string]: RenderedChunk} {
    type ChunkVisionTask = {
        currentId: string,
        parentId: string|null,
        vision: number,
    }

    // start with active chunk as root
    const visionTasks: ChunkVisionTask[] = [{
        currentId: activeChunkId,
        parentId: null,
        vision: Number.MAX_SAFE_INTEGER,
    }];
    const filteredChunks: {[key: string]: RenderedChunk} = {};

    // run through vision pipeline from root task as tree
    while (visionTasks.length > 0) {
        const task = visionTasks.shift();
        if (!task) {
            throw new Error("ChunkVisionTask is undefined");
        }

        // skip if already filtered or vision is zero
        if (task.vision <= 0 || filteredChunks[task.currentId]) {
            continue;
        }

        // get current chunk
        const currentChunk = calculatedChunks[task.currentId];
        if (!currentChunk) {
            throw new Error(`Chunk ${task.currentId} not found`);
        }

        // add chunk to filtered list
        filteredChunks[task.currentId] = currentChunk;

        // add neighbours to vision queue
        currentChunk.model.joints.forEach((joint: JointModel) => {
            if (joint.neighbour === task.parentId) {
                return;
            }
            visionTasks.push({
                currentId: joint.neighbour,
                parentId: task.currentId,
                vision: Math.min(task.vision - 1, joint.vision),
            });
        });
    }

    return filteredChunks;
}

/**
 * Calculate the geometry of all chunks based on the chunk models
 * @param chunkModels Chunk models from API
 * @param startChunkId Start Chunk where the rendering initial starts to prevent orphan chunk issues
 */
function calculateChunkGeometry(
    chunkModels: {[key: string]: ChunkModel},
    startChunkId: string
): {[key: string]: RenderedChunk} {
    type ChunkGeometryTask = {
        currentId: string,
        parentId: string | null,
        position: Vector3Like,
    }

    // start with start chunk as root
    const tasks: ChunkGeometryTask[] = [{
        currentId: startChunkId,
        parentId: null,
        position: {x: 0, y: 0, z: 0},
    }];
    const calculatedChunks: {[key: string]: RenderedChunk} = {};

    // run through geometry pipeline from root task as tree
    while (tasks.length > 0) {
        const task = tasks.shift();
        if (!task) {
            throw new Error("ChunkCalculator task is undefined");
        }

        // skip if already calculated
        if (calculatedChunks[task.currentId]) {
            continue;
        }

        // get chunk models
        const currentModel = chunkModels[task.currentId];
        if (!currentModel) {
            throw new Error(`Chunk model ${task.currentId} not found`);
        }

        // calculate dimension
        const renderDimension = calculateCameraDimension(currentModel.elements);

        // get joint with parent name
        const jointToParent
            = currentModel.joints.find(joint => joint.neighbour === task.parentId);
        let renderPosition = new Vector3()
        if (jointToParent) {
            renderPosition = new Vector3()
                .copy(task.position)
                .sub(jointToParent.position)
        }

        // create new rendered chunk
        calculatedChunks[task.currentId] = {
            id: task.currentId,
            model: currentModel,
            renderPosition: renderPosition,
            renderDimension: renderDimension,
        };

        // add new tasks
        currentModel.joints.forEach((joint: JointModel) => {
            if (joint.neighbour === task.parentId) {
                return;
            }
            tasks.push({
                currentId: joint.neighbour,
                parentId: task.currentId,
                position: new Vector3().copy(renderPosition).add(joint.position),
            });
        });
    }

    return calculatedChunks;
}

/**
 * Calculate the camera dimension based on FloorBlocks
 * @param elementModels chunk elements from API
 */
function calculateCameraDimension(
    elementModels: ElementModel[],
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
