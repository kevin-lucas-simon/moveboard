import {ChunkModel} from "../model/world/ChunkModel";
import {Validator} from "./Validator";

export class ChunkValidator implements Validator<ChunkModel> {
    validate(chunk: ChunkModel) {
        this.shouldNotEmpty(chunk.id, "Chunk ID must not be empty.");
        this.shouldNotEmpty(chunk.name, "Chunk name must not be empty.");

        this.shouldHaveSameListIdentifier(chunk.elements, "id", "Chunk elements must have unique IDs.");
        this.shouldHaveSameListIdentifier(chunk.joints, "id", "Chunk joints must have unique IDs.");
    }

    protected shouldNotEmpty(
        value: any,
        message: string
    ) {
        if (
            !value ||
            (typeof value === 'string' && value.trim() === '') ||
            (Array.isArray(value) && value.length === 0)
        ) {
            throw new Error(message);
        }
    }

    // TS: The identifier does not directly have the correct partial type, only the overarching type
    protected shouldHaveSameListIdentifier(
        list: Partial<ChunkModel>,
        identifier: keyof Partial<Partial<ChunkModel>>,
        message: string
    ) {
        Object.keys(list).forEach((key) => {
            const item = list[key as keyof Partial<ChunkModel>] as Partial<ChunkModel>;
            if (!item || item[identifier] !== key) {
                throw new Error(message);
            }
        });
    }
}
