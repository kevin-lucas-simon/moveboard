import {NewChunkModel} from "./NewChunkModel";

/**
 * API data model
 */
export type NewLevelModel = {
    name: string,
    start: string,
    chunks: {[key: string]: NewChunkModel},
}
