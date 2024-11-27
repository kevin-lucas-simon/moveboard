import {NewChunkModel} from "../../model/NewChunkModel";

export function useRecursiveChunkDownloader(
    rootChunkName: string
): {[key: string]: NewChunkModel} {
    return chunkData;
}

const chunkData = {
    FirstChunk: {
        name: "FirstChunk",
        player: {x: 0, y: 1, z: 0},
        joints: [
            {
                "neighbour": "SecondChunk",
                "position": {x: -2.5, y: 1, z: 0},
                "dimension": {x: 1, y: 1, z: 2},
                "vision": 1,
            }
        ],
        elements: [
            {
                type: "FloorBlock",
                position: {x: 0, y: 0, z: 0},
                dimension: {x: 5, y: 1, z: 5},
                color: "rebeccapurple",
            },
            {
                type: "BasicBlock",
                position: {x: 1, y: 1, z: 1},
                dimension: {x: 1, y: 1, z: 1},
                color: "purple",
            },
        ]
    },
    SecondChunk: {
        name: "SecondChunk",
        player: {x: 0, y: 1, z: 0},
        joints: [
            {
                "neighbour": "FirstChunk",
                "position": {x: 2.5, y: 1, z: 0},
                "dimension": {x: 1, y: 1, z: 2},
                "vision": 0,
            },
            {
                "neighbour": "ThirdChunk",
                "position": {x: -2.5, y: 1, z: 0},
                "dimension": {x: 1, y: 1, z: 2},
                "vision": 2,
            }
        ],
        elements: [
            {
                type: "FloorBlock",
                position: {x: 0, y: 0, z: 0},
                dimension: {x: 5, y: 1, z: 5},
                color: "lightblue",
            }
        ]
    },
    ThirdChunk: {
        name: "ThirdChunk",
        player: {x: 0, y: 1, z: 0},
        joints: [
            {
                "neighbour": "SecondChunk",
                "position": {x: 2.5, y: 1, z: 0},
                "dimension": {x: 1, y: 1, z: 2},
                "vision": 1,
            },
            {
                "neighbour": "FourthChunk",
                "position": {x: -2.5, y: 1, z: 0},
                "dimension": {x: 1, y: 1, z: 2},
                "vision": 1,
            }
        ],
        elements: [
            {
                type: "FloorBlock",
                position: {x: 0, y: 0, z: 0},
                dimension: {x: 5, y: 1, z: 5},
                color: "lightblue",
            }
        ]
    },
    FourthChunk: {
        name: "FourthChunk",
        player: {x: 0, y: 1, z: 0},
        joints: [
            {
                "neighbour": "ThirdChunk",
                "position": {x: 2.5, y: 1, z: 0},
                "dimension": {x: 1, y: 1, z: 2},
                "vision": 1,
            }
        ],
        elements: [
            {
                type: "FloorBlock",
                position: {x: 0, y: 0, z: 0},
                dimension: {x: 5, y: 1, z: 5},
                color: "lightblue",
            }
        ]
    },
};