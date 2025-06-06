import {ChunkModel} from "../ChunkModel";

export class ChunkValidator {
    static validate(chunk: ChunkModel) {
        if (!chunk.id) {
            throw new Error("Chunk ID is required.");
        }

        if (!chunk.name || chunk.name.trim() === "") {
            throw new Error("Chunk name must not be empty.");
        }

        Object.keys(chunk.elements).forEach((elementId) => {
            const element = chunk.elements[elementId];
            if (element.id !== elementId) {
                throw new Error(`Element ID mismatch: expected ${elementId}, got ${element.id}.`);
            }
            // TODO ElementValidator
        });
    }
}