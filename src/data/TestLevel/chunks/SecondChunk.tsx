import {FirstChunk} from "./FirstChunk";
import {Vector3} from "three";
import {BasicBlock} from "../../../components/blocks/BasicBlock";
import {Chunk} from "../../../components/chunks/Chunk";
import {FloorBlock} from "../../../components/blocks/FloorBlock";
import {CeilingBlock} from "../../../components/blocks/CeilingBlock";
import {TunnelChunk} from "./TunnelChunk";
import {WallWithHoleStructure} from "../structure/WallWithHoleStructure";

export function SecondChunk() {
    return (
        <Chunk name={SecondChunk.name} joints={[
            {
                neighbour: TunnelChunk.name,
                position: new Vector3(2, 1, 0),
                dimension: new Vector3(1, 1, 1.5),
            }
        ]}>
            <FloorBlock
                position={new Vector3(0,0,0)}
                dimension={new Vector3(5,1,5)}
                color={"green"}
            />
            <CeilingBlock
                position={new Vector3(0,6,0)}
                dimension={new Vector3(5,1,5)}
            />

            <BasicBlock position={new Vector3(0, 3, 2)} dimension={new Vector3(5,5,1)} color={"lightgreen"} />
            <BasicBlock position={new Vector3(0, 3, -2)} dimension={new Vector3(5,5,1)} color={"lightgreen"} />

            <BasicBlock position={new Vector3(-2, 3, 0)} dimension={new Vector3(1,5,5)} color={"lightgreen"} />
            <WallWithHoleStructure
                position={new Vector3(2, 3, 0)}
                dimension={new Vector3(1,5,5)}
                holeDimension={new Vector3(1,1,1.5)}
                holeOffset={new Vector3(0,-2,0)}
                color={"lightgreen"}
            />
        </Chunk>
    );
}
