import {ValidationError, Validator} from "./Validator";

import {ChunkModel} from "../model/structure/spacial/ChunkModel";

export class ChunkValidator implements Validator<ChunkModel> {
    private errors: ValidationError[] = [];

    validate(chunk: ChunkModel): ValidationError[] {
        this.shouldNotEmpty(chunk.id, "Chunk ID must not be empty.");
        this.shouldNotEmpty(chunk.name, "Chunk name must not be empty.");

        this.shouldHaveSameListIdentifier(chunk.elements, "id", "Chunk elements must have unique IDs.");

        return this.errors;
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
            this.errors.push({message: message})
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
                this.errors.push({message: message})
            }
        });
    }
}
