import {LevelModel} from "../LevelModel";
import {ChunkValidator} from "./ChunkValidator";
import {ChunkID} from "../ChunkModel";

export class LevelValidator {
    static validate(level: LevelModel) {
        if (!level.id) {
            throw new Error("Level ID is required.");
        }

        if (!level.name || level.name.trim() === "") {
            throw new Error("Level name must not be empty.");
        }

        if (!level.chunks[level.start]) {
            throw new Error(`Start chunk '${level.start}' does not exist.`);
        }

        Object.keys(level.chunks).forEach((chunkId) => {
            const chunk = level.chunks[chunkId as ChunkID];
            if (chunk.id !== chunkId) {
                throw new Error(`Chunk ID mismatch: expected ${chunkId}, got ${chunk.id}.`);
            }
            ChunkValidator.validate(chunk);
        });

        // TODO add joint validation if pointed chunks are existing
        // TODO refactor it to readable private methods
    }
}
