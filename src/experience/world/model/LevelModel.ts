import {ChunkModel} from "./ChunkModel";

/**
 * API data model
 */
export type LevelModel = {
    name: string,
    start: string,
    chunks: {[key: string]: ChunkModel},
}
