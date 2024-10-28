import {Vector3} from "three";
import {BasicBlock} from "../../../components/blocks/BasicBlock";
import {Chunk} from "../../../components/chunks/Chunk";
import {FloorBlock} from "../../../components/blocks/FloorBlock";
import {BarrierBlock} from "../../../components/blocks/BarrierBlock";
import {TunnelChunk} from "./TunnelChunk";
import {WallWithHoleStructure} from "../structure/WallWithHoleStructure";
import {deserialize} from "../../../components/serializer/serialize";
import * as React from "react";
import {BouncerBlock} from "../../../components/blocks/BouncerBlock";

export function SecondChunk() {
    const chunkJSX = (
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
            <BarrierBlock
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

    const chunkData = "{\"type\":\"Chunk\",\"props\":{\"name\":\"SecondChunk\",\"joints\":[{\"neighbour\":\"TunnelChunk\",\"position\":{\"x\":2,\"y\":1,\"z\":0},\"dimension\":{\"x\":1,\"y\":1,\"z\":1.5}}],\"children\":[{\"type\":\"FloorBlock\",\"props\":{\"position\":{\"x\":0,\"y\":0,\"z\":0},\"dimension\":{\"x\":5,\"y\":1,\"z\":5},\"color\":\"green\"}},{\"type\":\"BarrierBlock\",\"props\":{\"position\":{\"x\":0,\"y\":6,\"z\":0},\"dimension\":{\"x\":5,\"y\":1,\"z\":5}}},{\"type\":\"BasicBlock\",\"props\":{\"position\":{\"x\":0,\"y\":3,\"z\":2},\"dimension\":{\"x\":5,\"y\":5,\"z\":1},\"color\":\"lightgreen\"}},{\"type\":\"BasicBlock\",\"props\":{\"position\":{\"x\":0,\"y\":3,\"z\":-2},\"dimension\":{\"x\":5,\"y\":5,\"z\":1},\"color\":\"lightgreen\"}},{\"type\":\"BasicBlock\",\"props\":{\"position\":{\"x\":-2,\"y\":3,\"z\":0},\"dimension\":{\"x\":1,\"y\":5,\"z\":5},\"color\":\"lightgreen\"}},{\"type\":\"WallWithHoleStructure\",\"props\":{\"position\":{\"x\":2,\"y\":3,\"z\":0},\"dimension\":{\"x\":1,\"y\":5,\"z\":5},\"holeDimension\":{\"x\":1,\"y\":1,\"z\":1.5},\"holeOffset\":{\"x\":0,\"y\":-2,\"z\":0},\"color\":\"lightgreen\"}}]}}\n" as string;

    const chunk = deserialize(chunkData, {
        components: {
            [BasicBlock.name]: BasicBlock as React.ComponentType,
            [Chunk.name]: Chunk as React.ComponentType,
            [FloorBlock.name]: FloorBlock as React.ComponentType,
            [BarrierBlock.name]: BarrierBlock as React.ComponentType,
            [WallWithHoleStructure.name]: WallWithHoleStructure as React.ComponentType,
            [TunnelChunk.name]: TunnelChunk as React.ComponentType,
            [BouncerBlock.name]: BouncerBlock as React.ComponentType,
        }
    })

    return chunk;
}
