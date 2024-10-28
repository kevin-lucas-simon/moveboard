import {FloorBlock} from "../../../components/blocks/FloorBlock";
import {Vector3} from "three";
import {Chunk} from "../../../components/chunks/Chunk";
import {FirstChunk} from "./FirstChunk";
import {SecondChunk} from "./SecondChunk";
import {BarrierBlock} from "../../../components/blocks/BarrierBlock";
import {BasicBlock} from "../../../components/blocks/BasicBlock";
import {deserialize} from "../../../components/serializer/serialize";
import * as React from "react";
import {WallWithHoleStructure} from "../structure/WallWithHoleStructure";
import {BouncerBlock} from "../../../components/blocks/BouncerBlock";

export function TunnelChunk() {
    const ChunkJSX = (
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

    const chunkData = "{\"type\":\"Chunk\",\"props\":{\"name\":\"TunnelChunk\",\"joints\":[{\"neighbour\":\"FirstChunk\",\"position\":{\"x\":4.5,\"y\":1.5,\"z\":2},\"dimension\":{\"x\":1,\"y\":2,\"z\":2}},{\"neighbour\":\"SecondChunk\",\"position\":{\"x\":-4.5,\"y\":1,\"z\":-2},\"dimension\":{\"x\":1,\"y\":1,\"z\":1.5}}],\"children\":[{\"type\":\"FloorBlock\",\"props\":{\"position\":{\"x\":0,\"y\":0,\"z\":0},\"dimension\":{\"x\":4,\"y\":1,\"z\":8}}},{\"type\":\"FloorBlock\",\"props\":{\"position\":{\"x\":-3,\"y\":0,\"z\":-2},\"dimension\":{\"x\":2,\"y\":1,\"z\":4}}},{\"type\":\"FloorBlock\",\"props\":{\"position\":{\"x\":3,\"y\":0,\"z\":2},\"dimension\":{\"x\":2,\"y\":1,\"z\":4}}},{\"type\":\"BarrierBlock\",\"props\":{\"position\":{\"x\":0,\"y\":3,\"z\":0},\"dimension\":{\"x\":4,\"y\":1,\"z\":8}}},{\"type\":\"BarrierBlock\",\"props\":{\"position\":{\"x\":-3,\"y\":3,\"z\":-2},\"dimension\":{\"x\":2,\"y\":1,\"z\":4}}},{\"type\":\"BarrierBlock\",\"props\":{\"position\":{\"x\":3,\"y\":3,\"z\":2},\"dimension\":{\"x\":2,\"y\":1,\"z\":4}}},{\"type\":\"BasicBlock\",\"props\":{\"position\":{\"x\":1,\"y\":1.5,\"z\":3.5},\"dimension\":{\"x\":6,\"y\":2,\"z\":1},\"color\":\"lightgrey\"}},{\"type\":\"BasicBlock\",\"props\":{\"position\":{\"x\":-1,\"y\":1.5,\"z\":-3.5},\"dimension\":{\"x\":6,\"y\":2,\"z\":1},\"color\":\"lightgrey\"}},{\"type\":\"BasicBlock\",\"props\":{\"position\":{\"x\":-2.5,\"y\":1.5,\"z\":-0.5},\"dimension\":{\"x\":3,\"y\":2,\"z\":1},\"color\":\"lightgrey\"}},{\"type\":\"BasicBlock\",\"props\":{\"position\":{\"x\":2.5,\"y\":1.5,\"z\":0.5},\"dimension\":{\"x\":3,\"y\":2,\"z\":1},\"color\":\"lightgrey\"}},{\"type\":\"BasicBlock\",\"props\":{\"position\":{\"x\":1.5,\"y\":1.5,\"z\":-1.5},\"dimension\":{\"x\":1,\"y\":2,\"z\":3},\"color\":\"lightgrey\"}},{\"type\":\"BasicBlock\",\"props\":{\"position\":{\"x\":-1.5,\"y\":1.5,\"z\":1.5},\"dimension\":{\"x\":1,\"y\":2,\"z\":3},\"color\":\"lightgrey\"}}]}}\n" as string;

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
