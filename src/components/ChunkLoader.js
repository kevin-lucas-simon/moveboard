import {BlockChunk} from "./BlockChunk";
import chunkData from "../data/chunkData";

export function ChunkLoader() {
    // create start chunk
    const start = new BlockChunk("start", chunkData.start)

    // create neighbour chunks
    const renderChunks = [
        start,
        ...start.joints.map(joint => {
            return new BlockChunk(joint.chunk, chunkData[joint.chunk], "start", joint)
        })
    ]

    // render chunks
    return renderChunks.map(chunk => {
        return chunk.render()
    });
}
