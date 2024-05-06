import {FirstChunk} from "./FirstChunk";
import {Vector3} from "three";
import {Chunk} from "../../../components/chunks/Chunk.tsx";
import {BasicBlock} from "../../../components/blocks/BasicBlock";

export function SecondChunk() {
    return (
        <Chunk name={SecondChunk.name} joints={[
            {
                neighbour: FirstChunk.name,
                position: new Vector3(1.5, 1, 0),
                dimension: new Vector3(1, 1, 1),
            }
        ]}>
            <BasicBlock
                position={new Vector3(0,0,0)}
                dimension={new Vector3(3,1,3)}
            />
        </Chunk>
    )
}
