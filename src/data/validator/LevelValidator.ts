import {LevelModel} from "../model/world/LevelModel";
import {ChunkValidator} from "./ChunkValidator";
import {ChunkModel} from "../model/world/ChunkModel";
import {Validator} from "./Validator";

export class LevelValidator implements Validator<LevelModel> {
    validate(level: LevelModel) {
        this.shouldHaveValue(level.id, "Level ID must not be empty.");
        this.shouldHaveValue(level.name, "Level name must not be empty.");

        this.shouldExistIn(level.start, level.chunks, `Start chunk '${level.start}' does not exist in level chunks.`);

        this.shouldHaveSameListIdentifier(level.chunks, "id", "Level chunks must have unique IDs.");
        this.checkChunkJointsPointToExistingChunks(level);

        Object.values(level.chunks).forEach((chunk) => {
            new ChunkValidator().validate(chunk as ChunkModel);
        });
    }

    protected shouldHaveValue(
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

    protected shouldExistIn(
        value: any,
        collection: Record<string, any>,
        message: string
    ) {
        if (!collection[value]) {
            throw new Error(message);
        }
    }

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

    private checkChunkJointsPointToExistingChunks(level: LevelModel) {
        Object.values(level.chunks).forEach((chunk) => {
            Object.values(chunk.joints || {}).forEach((joint) => {
                this.shouldExistIn(
                    joint.neighbour,
                    level.chunks,
                    `Joint '${joint.id}' in chunk '${chunk.id}' points to non-existing chunk '${joint.neighbour}'.`
                );
            })
        })
    }
}
