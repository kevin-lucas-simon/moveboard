import {BlockChunk} from "./BlockChunk";

export function ChunkLoader() {
    const chunksData = require('../data/chunks.json') // TODO vlt doch in javascript file umwandeln für Kommentieren?

    // create start chunk
    const start = new BlockChunk("down", chunksData.down)

    // create neighbour chunks
    const chunks = [
        start,
        ...start.joints.map(joint => {
            return new BlockChunk(joint.chunk, chunksData[joint.chunk], joint, start.key)
        })
    ]

    console.log(chunks)

    // render chunks
    return chunks.map(chunk => {
        return chunk.render()
    });
}
