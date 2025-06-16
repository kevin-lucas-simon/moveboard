import {ChunkID, ChunkModel} from "../../../data/model/world/ChunkModel";
import {Vector3, Vector3Like} from "three";
import {FloorBlock} from "../../element/block/FloorBlock";
import {JointModel} from "../../../data/model/world/JointModel";
import {ElementModel} from "../../../data/model/element/ElementModel";
import {useMemo, useRef} from "react";
import {BasicBlockModel} from "../../../data/model/element/block/BasicBlockModel";

export type RenderedChunk = {
    model: ChunkModel,
    worldPosition: Vector3Like,
    playerSpawnPosition: Vector3Like,
    chunkDimension: RenderDimension,
    cameraDimension: RenderDimension,
}
type RenderDimension = {
    size: Vector3Like,
    centerPosition: Vector3Like,
    minimalPosition: Vector3Like,
    maximalPosition: Vector3Like,
}

/**
 * Calculate visible chunks based on provided chunk models starting from the active chunk
 * @param chunkModels Chunk models from API
 * @param activeChunkId Active chunk defines which chunks neighbours should be visible
 */
export function useChunkRenderer(
    chunkModels: {[key: ChunkID]: ChunkModel},
    activeChunkId: ChunkID
): {[key: ChunkID]: RenderedChunk} {
    // save rendering for next active chunk position reuse
    const calculatedChunks = useRef<{[key: string]: RenderedChunk}|undefined>(undefined);

    // cache active chunk rendering
    return useMemo(() => {
        // reuse previous calculated position
        const activePosition = calculatedChunks.current?.[activeChunkId]?.worldPosition ?? new Vector3(0, 0, 0);

        // calculate chunks from active chunk as root
        calculatedChunks.current = calculateChunks(
            chunkModels,
            activeChunkId,
            activePosition,
            true // render root neighbour else we do not know their position
        );

        // filter out all chunks that are not visible
        return calculatedChunks.current;
    }, [chunkModels, activeChunkId]);
}

/**
 * Calculate the geometry of the visible chunks based on the chunk models starting from root chunk
 * @param chunkModels Chunk models from API
 * @param rootChunkId Chunk where the rendering initial starts to prevent orphan chunk issues
 * @param rootChunkPosition Position of the Root Chunk
 * @param renderRootNeighbour If enabled, additionally render all hidden root joint neighbours, e.g. for position access
 */
function calculateChunks(
    chunkModels: {[key: ChunkID]: ChunkModel},
    rootChunkId: ChunkID,
    rootChunkPosition: Vector3Like,
    renderRootNeighbour: boolean = false,
): {[key: ChunkID]: RenderedChunk} {
    type ChunkRenderTask = {
        currentId: ChunkID,
        parentId: ChunkID|null,
        position: Vector3Like,
        vision: number,
    }

    // start root chunk as root task
    const tasks: ChunkRenderTask[] = [{
        currentId: rootChunkId,
        parentId: null,
        position: rootChunkPosition,
        vision: Number.MAX_SAFE_INTEGER,
    }];
    const calculatedChunks: {[key: string]: RenderedChunk} = {};

    // run through geometry pipeline from root task as tree
    while (tasks.length > 0) {
        const task = tasks.shift();
        if (!task) {
            throw new Error("Chunk task is undefined");
        }

        // skip task if already calculated or vision is zero
        const isNotVisible = task.vision < 0;
        const isChunkCalculated = calculatedChunks[task.currentId];
        const ignoreCheck = renderRootNeighbour && task.parentId === rootChunkId

        if ((isNotVisible || isChunkCalculated) && !ignoreCheck) {
            continue;
        }

        // get chunk models
        const currentModel = chunkModels[task.currentId];
        if (!currentModel) {
            continue;
        }

        // set default render position to the task position
        let renderPosition = new Vector3().copy(task.position);

        // apply parent chunk position if available
        Object.values(currentModel.joints).forEach(joint => {
            // find joint to parent chunk
            if (joint.neighbour === task.parentId && joint.neighbour !== null) {
                renderPosition = new Vector3()
                    .copy(task.position)
                    .sub(joint.position)
                ;
                return;
            }
        })

        // calculate dimensions
        const chunkDimension = calculateRenderDimension(
            Object.values(currentModel.elements),
            renderPosition
        );
        const cameraDimension = calculateRenderDimension(
            Object.values(currentModel.elements).filter(element => element.type === FloorBlock.name),
            renderPosition
        );

        // calculate player spawn position
        const playerSpawnPosition = new Vector3()
            .copy(renderPosition)
            .add(currentModel.player);

        // create new rendered chunk
        calculatedChunks[task.currentId] = {
            model: currentModel,
            worldPosition: renderPosition,
            playerSpawnPosition: playerSpawnPosition,
            chunkDimension: chunkDimension,
            cameraDimension: cameraDimension,
        };

        // add new tasks
        Object.values(currentModel.joints).forEach((joint: JointModel) => {
            if (!joint.neighbour || joint.neighbour === task.parentId) {
                return;
            }
            tasks.push({
                currentId: joint.neighbour,
                parentId: task.currentId,
                position: new Vector3().copy(renderPosition).add(joint.position),
                vision: Math.min(task.vision - 1, joint.vision),
            });
        });
    }

    return calculatedChunks;
}

/**
 * Calculate the render dimension of the chunk based on the block models and world position
 * @param elementModels chunk elements from API
 * @param worldPosition world position of the chunk
 */
function calculateRenderDimension(
    elementModels: ElementModel[],
    worldPosition: Vector3Like,
): RenderDimension {
    const minPosition = new Vector3(Infinity, Infinity, Infinity);
    const maxPosition = new Vector3(-Infinity, -Infinity, -Infinity);

    elementModels.forEach((element) => {
        // skip if element is not a block
        const block = element as BasicBlockModel;
        if (!block.position || !block.dimension) {
            return;
        }

        // calculate minimal and maximal position
        minPosition.x = Math.min(minPosition.x, block.position.x - block.dimension.x / 2);
        minPosition.y = Math.min(minPosition.y, block.position.y - block.dimension.y / 2);
        minPosition.z = Math.min(minPosition.z, block.position.z - block.dimension.z / 2);

        maxPosition.x = Math.max(maxPosition.x, block.position.x + block.dimension.x / 2);
        maxPosition.y = Math.max(maxPosition.y, block.position.y + block.dimension.y / 2);
        maxPosition.z = Math.max(maxPosition.z, block.position.z + block.dimension.z / 2);
    });

    // calculate new dimension
    const dimension = maxPosition.clone().sub(minPosition);

    // calculate chunk center world position
    const centerPosition = calculateChunkCenterWorldPosition(
        worldPosition,
        minPosition,
        maxPosition,
    );

    // return the result
    return {
        size: dimension,
        centerPosition: centerPosition,
        minimalPosition: minPosition,
        maximalPosition: maxPosition,
    };
}

/**
 * Calculate the camera center world position based on the chunk position and dimension
 * @param worldPosition
 * @param minPosition
 * @param maxPosition
 */
function calculateChunkCenterWorldPosition(
    worldPosition: Vector3Like,
    minPosition: Vector3Like,
    maxPosition: Vector3Like,
): Vector3Like {
    const worldMin = new Vector3().copy(worldPosition).add(minPosition);
    const worldMax = new Vector3().copy(worldPosition).add(maxPosition);

    return new Vector3(
        (worldMin.x + worldMax.x) / 2,
        (worldMin.y + worldMax.y) / 2,
        (worldMin.z + worldMax.z) / 2,
    );
}
