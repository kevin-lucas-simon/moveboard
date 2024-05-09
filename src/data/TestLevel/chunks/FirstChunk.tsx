import {SecondChunk} from "./SecondChunk";
import {Vector3} from "three";
import {BasicBlock} from "../../../components/blocks/BasicBlock";
import {Chunk} from "../../../components/chunks/Chunk";

export function FirstChunk() {
    return (
        <Chunk name={FirstChunk.name} joints={[
            {
                neighbour: SecondChunk.name,
                position: new Vector3(-3.5, 1, 0),
                dimension: new Vector3(1,1,1)
            },
            {
                neighbour: "Multi0",
                position: new Vector3(3.5, 1, 0),
                dimension: new Vector3(1,1,1)
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
    );
}
