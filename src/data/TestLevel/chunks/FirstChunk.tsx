import {Vector3} from "three";
import {BasicBlock} from "../../../components/blocks/BasicBlock";
import {Chunk} from "../../../components/chunks/Chunk";
import {FloorBlock} from "../../../components/blocks/FloorBlock";
import {BarrierBlock} from "../../../components/blocks/BarrierBlock";
import {WallWithHoleStructure} from "../structure/WallWithHoleStructure";
import {TunnelChunk} from "./TunnelChunk";
import {BouncerBlock} from "../../../components/blocks/BouncerBlock";
import {deserialize} from "../../../components/serializer/serialize";
import * as React from "react";

export function FirstChunk() {
    const chunkJSX = (
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

            {/* bouncer blocks */}
            <BouncerBlock
                position={new Vector3(0,1,-4)}
                diameter={2}
                intensity={2}
            />
            <BouncerBlock
                position={new Vector3(4,1,-1)}
                diameter={3}
                intensity={3}
            />
            <BouncerBlock
                position={new Vector3(0,1,3.5)}
                diameter={1}
                intensity={1}
            />
            <BouncerBlock
                position={new Vector3(-2,1,3.5)}
                diameter={1}
                intensity={2}
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
    )

    const chunkData = "{\"type\":\"Chunk\",\"props\":{\"name\":\"FirstChunk\",\"joints\":[{\"neighbour\":\"TunnelChunk\",\"position\":{\"x\":-4,\"y\":1.5,\"z\":0},\"dimension\":{\"x\":1,\"y\":2,\"z\":2}}],\"children\":[{\"type\":\"FloorBlock\",\"props\":{\"position\":{\"x\":0,\"y\":0,\"z\":0},\"dimension\":{\"x\":9,\"y\":1,\"z\":9},\"color\":\"blue\"}},{\"type\":\"BarrierBlock\",\"props\":{\"position\":{\"x\":0,\"y\":4,\"z\":0},\"dimension\":{\"x\":9,\"y\":1,\"z\":9},\"color\":\"blue\"}},{\"type\":\"BasicBlock\",\"props\":{\"position\":{\"x\":2,\"y\":1,\"z\":2},\"dimension\":{\"x\":1,\"y\":1,\"z\":1},\"color\":\"lightblue\"}},{\"type\":\"BouncerBlock\",\"props\":{\"position\":{\"x\":0,\"y\":1,\"z\":-4},\"diameter\":2,\"intensity\":2}},{\"type\":\"BouncerBlock\",\"props\":{\"position\":{\"x\":4,\"y\":1,\"z\":-1},\"diameter\":3,\"intensity\":3}},{\"type\":\"BouncerBlock\",\"props\":{\"position\":{\"x\":0,\"y\":1,\"z\":3.5},\"diameter\":1,\"intensity\":1}},{\"type\":\"BouncerBlock\",\"props\":{\"position\":{\"x\":-2,\"y\":1,\"z\":3.5},\"diameter\":1,\"intensity\":2}},{\"type\":\"BasicBlock\",\"props\":{\"position\":{\"x\":0,\"y\":2,\"z\":-4},\"dimension\":{\"x\":9,\"y\":3,\"z\":1},\"color\":\"lightblue\"}},{\"type\":\"BasicBlock\",\"props\":{\"position\":{\"x\":0,\"y\":2,\"z\":4},\"dimension\":{\"x\":9,\"y\":3,\"z\":1},\"color\":\"lightblue\"}},{\"type\":\"WallWithHoleStructure\",\"props\":{\"position\":{\"x\":-4,\"y\":2,\"z\":0},\"dimension\":{\"x\":1,\"y\":3,\"z\":7},\"holeDimension\":{\"x\":2,\"y\":2,\"z\":2},\"holeOffset\":{\"x\":0,\"y\":-0.5,\"z\":0},\"color\":\"lightblue\"}},{\"type\":\"BasicBlock\",\"props\":{\"position\":{\"x\":4,\"y\":2,\"z\":0},\"dimension\":{\"x\":1,\"y\":3,\"z\":7},\"color\":\"lightblue\"}}]}}\n"

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
