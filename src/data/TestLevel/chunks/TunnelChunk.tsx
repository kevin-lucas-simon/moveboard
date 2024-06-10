import {FloorBlock} from "../../../components/blocks/FloorBlock";
import {Vector3} from "three";
import {Chunk} from "../../../components/chunks/Chunk";
import {FirstChunk} from "./FirstChunk";
import {SecondChunk} from "./SecondChunk";
import {BarrierBlock} from "../../../components/blocks/BarrierBlock";
import {BasicBlock} from "../../../components/blocks/BasicBlock";

export function TunnelChunk() {
    return (
        <Chunk name={TunnelChunk.name} joints={[
            {
                neighbour: FirstChunk.name,
                position: new Vector3(4.5, 1.5, 2),
                dimension: new Vector3(1,2,2)
            },
            {
                neighbour: SecondChunk.name,
                position: new Vector3(-4.5, 1, -2),
                dimension: new Vector3(1,1,1.5)
            },
        ]}>
            <FloorBlock position={new Vector3(0,0,0)} dimension={new Vector3(4,1,8)} />
            <FloorBlock position={new Vector3(-3,0,-2)} dimension={new Vector3(2,1,4)} />
            <FloorBlock position={new Vector3(3,0,2)} dimension={new Vector3(2,1,4)} />

            <BarrierBlock position={new Vector3(0,3,0)} dimension={new Vector3(4,1,8)} />
            <BarrierBlock position={new Vector3(-3,3,-2)} dimension={new Vector3(2,1,4)} />
            <BarrierBlock position={new Vector3(3,3,2)} dimension={new Vector3(2,1,4)} />

            <BasicBlock position={new Vector3(1,1.5,3.5)} dimension={new Vector3(6, 2, 1)} color={"lightgrey"} />
            <BasicBlock position={new Vector3(-1,1.5,-3.5)} dimension={new Vector3(6, 2, 1)} color={"lightgrey"} />

            <BasicBlock position={new Vector3(-2.5,1.5,-0.5)} dimension={new Vector3(3, 2, 1)} color={"lightgrey"} />
            <BasicBlock position={new Vector3(2.5,1.5,0.5)} dimension={new Vector3(3, 2, 1)} color={"lightgrey"} />

            <BasicBlock position={new Vector3(1.5,1.5,-1.5)} dimension={new Vector3(1, 2, 3)} color={"lightgrey"} />
            <BasicBlock position={new Vector3(-1.5,1.5,1.5)} dimension={new Vector3(1, 2, 3)} color={"lightgrey"} />
        </Chunk>
    );
}
