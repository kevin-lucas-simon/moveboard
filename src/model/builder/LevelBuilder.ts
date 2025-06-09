import {LevelModel} from "../LevelModel";
import {generateUUID} from "three/src/math/MathUtils";
import {ChunkModel} from "../ChunkModel";
import {LevelValidator} from "../validator/LevelValidator";
import {ChunkBuilder} from "./ChunkBuilder";

export class LevelBuilder {
    private level: LevelModel;

    private constructor(name: string) {
        const startChunk = ChunkBuilder.create("StartChunk").build();

        this.level = {
            id: generateUUID(),
            name: name,
            start: startChunk.id,
            chunks: {
                [startChunk.id]: startChunk,
            }
        };
    }

    static create(name: string): LevelBuilder {
        return new LevelBuilder(name);
    }

    static from(raw: LevelModel): LevelBuilder {
        const builder = new LevelBuilder(raw.name);
        builder.level = structuredClone(raw)
        return builder;
    }

    build(): LevelModel {
        LevelValidator.validate(this.level);
        return this.level;
    }

    setName(name: string) {
        this.level.name = name;
        return this;
    }

    setStart(id: string) {
        this.level.start = id;
        return this;
    }

    addChunk(chunk: ChunkModel): this {
        this.level.chunks = {
            ...this.level.chunks,
            [chunk.id]: structuredClone(chunk)
        }
        return this
    }

    removeChunk(id: string): this {
        const removedChunk=  this.level.chunks[id];
        if (!removedChunk) {
            return this;
        }

        // remove chunk from level
        const updatedChunks = Object.fromEntries(
            Object.entries(this.level.chunks).filter(([key]) => key !== removedChunk.id)
        )

        // update joints in remaining chunks to remove references to the removed chunk
        Object.entries(updatedChunks).forEach(([_, chunk]) => {
            Object.entries(chunk.joints).forEach(([_, joint]) => {
                if (joint.neighbour === removedChunk.id) {
                    joint.neighbour = "";
                }
            })
        })

        // return updated state with removed chunk
        this.level.chunks = updatedChunks

        return this;
    }
}