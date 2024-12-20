import {NewChunkModel} from "../../model/NewChunkModel";

export function useRecursiveChunkDownloader(
    rootChunkName: string
): {[key: string]: NewChunkModel} {
    return chunkData;
}

const chunkData = {
"FirstChunk": {
    "name": "FirstChunk",
    "player": {
        "x": 2,
        "y": 1,
        "z": 0
    },
    "joints": [
        {
            "neighbour": "SecondChunk",
            "position": {
                "x": -5,
                "y": 1.5,
                "z": 0
            },
            "dimension": {
                "x": 1,
                "y": 2,
                "z": 2
            },
            "vision": 1
        }
    ],
    "elements": [
        {
            "type": "FloorBlock",
            "position": {
                "x": 0,
                "y": 0,
                "z": 0
            },
            "dimension": {
                "x": 9,
                "y": 1,
                "z": 9
            },
            "color": "blue"
        },
        // {
        //     "type": "BarrierBlock",
        //     "position": {
        //         "x": 0,
        //         "y": 4,
        //         "z": 0
        //     },
        //     "dimension": {
        //         "x": 9,
        //         "y": 1,
        //         "z": 9
        //     },
        //     "color": "blue"
        // },
        {
            "type": "BasicBlock",
            "position": {
                "x": 2,
                "y": 1,
                "z": 2
            },
            "dimension": {
                "x": 1,
                "y": 1,
                "z": 1
            },
            "color": "lightblue"
        },
        // {
        //     "type": "BouncerBlock",
        //     "position": {
        //         "x": 0,
        //         "y": 1,
        //         "z": -4
        //     },
        //     "diameter": 2,
        //     "intensity": 2
        // },
        // {
        //     "type": "BouncerBlock",
        //     "position": {
        //         "x": 4,
        //         "y": 1,
        //         "z": -1
        //     },
        //     "diameter": 3,
        //     "intensity": 3
        // },
        // {
        //     "type": "BouncerBlock",
        //     "position": {
        //         "x": 0,
        //         "y": 1,
        //         "z": 3.5
        //     },
        //     "diameter": 1,
        //     "intensity": 1
        // },
        // {
        //     "type": "BouncerBlock",
        //     "position": {
        //         "x": -2,
        //         "y": 1,
        //         "z": 3.5
        //     },
        //     "diameter": 1,
        //     "intensity": 2
        // },
        {
            "type": "BasicBlock",
            "position": {
                "x": 0,
                "y": 2,
                "z": -4
            },
            "dimension": {
                "x": 9,
                "y": 3,
                "z": 1
            },
            "color": "lightblue"
        },
        {
            "type": "BasicBlock",
            "position": {
                "x": 0,
                "y": 2,
                "z": 4
            },
            "dimension": {
                "x": 9,
                "y": 3,
                "z": 1
            },
            "color": "lightblue"
        },
        {
            "type": "BasicBlock",
            "position": {
                "x": 4,
                "y": 2,
                "z": 0
            },
            "dimension": {
                "x": 1,
                "y": 3,
                "z": 7
            },
            "color": "lightblue"
        }
    ]
},
"SecondChunk": {
        "name": "SecondChunk",
        "player": {
            "x": 1,
            "y": 1,
            "z": 1
        },
        "joints": [
            {
                "neighbour": "FirstChunk",
                "position": {
                    "x": 2,
                    "y": 1.5,
                    "z": 0
                },
                "dimension": {
                    "x": 1,
                    "y": 2,
                    "z": 1.5
                },
                "vision": 0
            }
        ],
        "elements": [
            {
                "type": "FloorBlock",
                "position": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "dimension": {
                    "x": 5,
                    "y": 1,
                    "z": 5
                },
                "color": "green"
            },
            // {
            //     "type": "BarrierBlock",
            //     "position": {
            //         "x": 0,
            //         "y": 6,
            //         "z": 0
            //     },
            //     "dimension": {
            //         "x": 5,
            //         "y": 1,
            //         "z": 5
            //     }
            // },
            {
                "type": "BasicBlock",
                "position": {
                    "x": 0,
                    "y": 3,
                    "z": 2
                },
                "dimension": {
                    "x": 5,
                    "y": 5,
                    "z": 1
                },
                "color": "lightgreen"
            },
            {
                "type": "BasicBlock",
                "position": {
                    "x": 0,
                    "y": 3,
                    "z": -2
                },
                "dimension": {
                    "x": 5,
                    "y": 5,
                    "z": 1
                },
                "color": "lightgreen"
            },
            {
                "type": "BasicBlock",
                "position": {
                    "x": -2,
                    "y": 3,
                    "z": 0
                },
                "dimension": {
                    "x": 1,
                    "y": 5,
                    "z": 5
                },
                "color": "lightgreen"
            }
        ]
    }
};