import {Vector3} from "three";
import {SecondChunk} from "./SecondChunk";
import {Chunk, ChunkType} from "../../../components/chunks/Chunk";
import {BasicBlock} from "../../../components/blocks/BasicBlock";

export function FirstChunk() {
    return (
        <Chunk name={FirstChunk.name} type={ChunkType.BLOCK} joints={[
            {
                neighbour: SecondChunk.name, // TODO refactor to chunk
                position: new Vector3(-3.5, 1, 0),
            }
        ]}>
            <BasicBlock
                position={new Vector3(0,0,0)}
                dimension={new Vector3(7,1,7)}
                color={"blue"}
            />
            <BasicBlock
                position={new Vector3(2,1,2)}
                dimension={new Vector3(1,1,1)}
                color={"lightblue"}
            />
        </Chunk>
    )
}
