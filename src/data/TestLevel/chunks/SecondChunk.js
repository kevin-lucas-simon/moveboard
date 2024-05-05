import {FirstChunk} from "./FirstChunk";
import {Vector3} from "three";
import {Chunk} from "../../../components/chunks/Chunk";
import {Joint} from "../../../components/chunks/Joint";
import {BasicBlock} from "../../../components/blocks/BasicBlock";

export function SecondChunk() {
    return (
        <Chunk name={SecondChunk.name}>
            <Joint
                chunk={FirstChunk}
                position={new Vector3(1,1,0)}
            />

            <BasicBlock
                position={new Vector3(0,0,0)}
                dimension={new Vector3(2,1,2)}
            />
        </Chunk>
    )
}
