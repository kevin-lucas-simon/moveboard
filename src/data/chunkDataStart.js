export default {
    name: "start",
    type: "chunk:block",
    config: {
        walled: true
    },
    joints: [
        {
            type: "joint:block",
            chunk: "next",
            position: {
                x: 0,
                y: 0,
                z: 3.5
            },
            dimension: {
                x: 2,
                y: 1,
                z: 1
            }
        },
        {
            type: "joint:block",
            chunk: "down",
            position: {
                x: -3,
                y: 2,
                z: 0
            },
            dimension: {
                x: 1,
                y: 1,
                z: 2
            }
        }
    ],
    blocks: [
        {
            type: "block:basic",
            position: {
                x: 0,
                y: -1,
                z: 0
            },
            dimension: {
                x: 7,
                y: 1,
                z: 7
            },
            color: "#187187"
        },
        {
            type: "block:basic",
            position: {
                x: 2,
                y: 0,
                z: -2
            },
            dimension: {
                x: 1,
                y: 1,
                z: 1
            },
            color: "#888888"
        },
    ],
    entities: []
}
