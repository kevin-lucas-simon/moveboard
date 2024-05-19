import {SecondChunk} from "./SecondChunk";
import {Vector3} from "three";
import {BasicBlock} from "../../../components/blocks/BasicBlock";
import {Chunk} from "../../../components/chunks/Chunk";
import {FloorBlock} from "../../../components/blocks/FloorBlock";

export function FirstChunk() {
    return (
        <Chunk name={FirstChunk.name} joints={[
            {
                neighbour: SecondChunk.name,
                position: new Vector3(-4, 1, 0),
                dimension: new Vector3(1,1,1)
            },
            {
                neighbour: "Multi0",
                position: new Vector3(4, 1, 0),
                dimension: new Vector3(1,1,1)
            }
        ]}>
            <FloorBlock
                position={new Vector3(0,0,0)}
                dimension={new Vector3(9,1,9)}
                color={"blue"}
            />
            <BasicBlock
                position={new Vector3(2,1,2)}
                dimension={new Vector3(1,1,1)}
                color={"lightblue"}
            />

            {/* walls */}
            <BasicBlock position={new Vector3(0,1,-4)} dimension={new Vector3(9,1,1)} color={"lightblue"}/>
            <BasicBlock position={new Vector3(0,1,4)} dimension={new Vector3(9,1,1)} color={"lightblue"}/>

            <BasicBlock position={new Vector3(-4,1,-2)} dimension={new Vector3(1,1,3)} color={"lightblue"}/>
            <BasicBlock position={new Vector3(-4,1,2)} dimension={new Vector3(1,1,3)} color={"lightblue"}/>
            <BasicBlock position={new Vector3(4,1,-2)} dimension={new Vector3(1,1,3)} color={"lightblue"}/>
            <BasicBlock position={new Vector3(4,1,2)} dimension={new Vector3(1,1,3)} color={"lightblue"}/>


        </Chunk>
    );
}
