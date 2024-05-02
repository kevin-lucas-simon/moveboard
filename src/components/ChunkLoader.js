import chunksData from "../data/_chunksData";
import {BlockChunk} from "./chunks/BlockChunk";
import {PlayerBall} from "./entities/PlayerBall";

export function ChunkLoader() {
    const activeChunk = chunksData.find(chunk => chunk.name === "start")

    return (
        <>
            <PlayerBall />

            <BlockChunk chunkData={activeChunk} />

            {activeChunk.joints.map(joint =>
                <BlockChunk
                    key={joint.chunk}
                    chunkData={chunksData.find(chunk => chunk.name === joint.chunk)}
                    jointOriginChunk={activeChunk}
                    jointData={joint}
                />
            )}
        </>
    )
}
