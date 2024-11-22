import {NewChunkModel} from "../model/NewChunkModel";
import {NewChunk} from "./NewChunk";
import {NewElementModel} from "../element/NewElementModel";
import {OrbitControls} from "@react-three/drei";
import {Player} from "../entities/Player";

export type NewLevelProps = {
    startChunk: string,
}

export function NewLevel(props: NewLevelProps) {
    const chunks = chunkData;

    return (
        <>
            <OrbitControls />

            {chunks.map((chunk) =>
                <NewChunk key={chunk.name} {...chunk} position={{x:0, y:0, z:0}} />
            )}

            <Player position={chunks.find(chunk => chunk.name === props.startChunk)?.player ?? {x:0,y:5,z:0}} />
        </>
    );
}

const chunkData: NewChunkModel[] = [
    {
        name: "FirstChunk",
        player: {x: 0, y: 1, z: 0},
        joints: [],
        elements: [
            {
                type: "FloorBlock",
                position: {x: 0, y: 0, z: 0},
                dimension: {x: 5, y: 1, z: 5},
                color: "rebeccapurple",
            } as NewElementModel,
            {
                type: "BasicBlock",
                position: {x: 1, y: 1, z: 1},
                dimension: {x: 1, y: 1, z: 1},
                color: "purple",
            } as NewElementModel,
        ]
    }
]