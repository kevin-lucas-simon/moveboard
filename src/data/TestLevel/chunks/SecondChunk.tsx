import {FirstChunk} from "./FirstChunk";
import {Vector3} from "three";
import {BasicBlock} from "../../../components/blocks/BasicBlock";
import {Chunk} from "../../../components/chunks/Chunk";
import {FloorBlock} from "../../../components/blocks/FloorBlock";

export function SecondChunk() {
    return (
        <Chunk name={SecondChunk.name} joints={[
            {
                neighbour: FirstChunk.name,
                position: new Vector3(2, 1.5, 0),
                dimension: new Vector3(1, 2, 2),
            }
        ]}>
            <FloorBlock
                position={new Vector3(0,0,0)}
                dimension={new Vector3(3,1,3)}
            />
        </Chunk>
    );
}
