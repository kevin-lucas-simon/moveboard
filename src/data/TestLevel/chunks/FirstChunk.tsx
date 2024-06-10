import {Vector3} from "three";
import {BasicBlock} from "../../../components/blocks/BasicBlock";
import {Chunk} from "../../../components/chunks/Chunk";
import {FloorBlock} from "../../../components/blocks/FloorBlock";
import {BarrierBlock} from "../../../components/blocks/BarrierBlock";
import {WallWithHoleStructure} from "../structure/WallWithHoleStructure";
import {TunnelChunk} from "./TunnelChunk";

export function FirstChunk() {
    return (
        <Chunk name={FirstChunk.name} joints={[
            {
                neighbour: TunnelChunk.name,
                position: new Vector3(-4, 1.5, 0),
                dimension: new Vector3(1,2,2)
            },
        ]}>
            <FloorBlock
                position={new Vector3(0,0,0)}
                dimension={new Vector3(9,1,9)}
                color={"blue"}
            />
            <BarrierBlock
                position={new Vector3(0,4,0)}
                dimension={new Vector3(9,1,9)}
                color={"blue"}
            />
            <BasicBlock
                position={new Vector3(2,1,2)}
                dimension={new Vector3(1,1,1)}
                color={"lightblue"}
            />

            {/* top down walls */}
            <BasicBlock position={new Vector3(0,2,-4)} dimension={new Vector3(9,3,1)} color={"lightblue"}/>
            <BasicBlock position={new Vector3(0,2,4)} dimension={new Vector3(9,3,1)} color={"lightblue"}/>

            {/* left wall */}
            <WallWithHoleStructure
                position={new Vector3(-4, 2, 0)}
                dimension={new Vector3(1,3,7)}
                holeDimension={new Vector3(2,2,2)}
                holeOffset={new Vector3(0,-0.5,0)}
                color={"lightblue"}
            />

            {/* right wall*/}
            <BasicBlock
                position={new Vector3(4, 2, 0)}
                dimension={new Vector3(1,3,7)}
                color={"lightblue"}
            />
        </Chunk>
    );
}
