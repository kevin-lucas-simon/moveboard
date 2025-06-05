import {ChunkModel} from "../ChunkModel";

export class ChunkValidator {
    static validate(chunk: ChunkModel) {
        if (!chunk.id) {
            throw new Error("Chunk ID is required.");
        }

        if (!chunk.name || chunk.name.trim() === "") {
            throw new Error("Chunk name must not be empty.");
        }
    }
}