import chunksData from "../data/chunksData";
import {BlockChunk} from "./BlockChunk";

export function ChunkLoader() {
    return (
        <>
            <BlockChunk chunkData={chunksData.start} />

            {chunksData.start.joints.map(joint =>
                <BlockChunk chunkData={chunksData[joint.chunk]} jointKey={"start"} jointData={joint}/>
            )}
        </>
    )
}
