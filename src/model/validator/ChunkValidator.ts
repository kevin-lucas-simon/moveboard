import {ChunkModel} from "../ChunkModel";
import {ElementID} from "../ElementModel";
import {Validator} from "./Validator";

export class ChunkValidator implements Validator<ChunkModel> {
    static validate(chunk: ChunkModel) {
        if (!chunk.id) {
            throw new Error("Chunk ID is required.");
        }

        if (!chunk.name || chunk.name.trim() === "") {
            throw new Error("Chunk name must not be empty.");
        }

        Object.keys(chunk.elements).forEach((elementId) => {
            const element = chunk.elements[elementId as ElementID];
            if (element.id !== elementId) {
                throw new Error(`Element ID mismatch: expected ${elementId}, got ${element.id}.`);
            }
            // TODO ElementValidator
        });

        // TODO JointValidator
    }
}