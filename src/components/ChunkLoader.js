import chunksData from "../data/_chunksData";
import {BlockChunk} from "./chunks/BlockChunk";

export function ChunkLoader() {
    const activeChunk = chunksData.find(chunk => chunk.name === "start")

    return (
        <>
            <BlockChunk chunkData={activeChunk} />

            {activeChunk.joints.map(joint =>
                <BlockChunk
                    key={joint.chunk}
                    chunkData={chunksData.find(chunk => chunk.name === joint.chunk)}
                    jointOrigin={activeChunk.name}
                    jointData={joint}
                />
            )}
        </>
    )
}
