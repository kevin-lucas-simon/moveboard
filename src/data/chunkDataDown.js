export default {
    key: "down",
    type: "chunk:block",
    joints: [
        {
            chunk: "start",
            direction: "+x",
            position: {
                x: 4,
                y: 0,
                z: 0
            },
            dimension: {
                x: 1,
                y: 1,
                z: 2
            },
            color: "#bada55"
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
                x: 5,
                y: 1,
                z: 5
            },
            color: "#222222"
        },
        {
            type: "block:basic",
            position: {
                x: 4,
                y: 0,
                z: 0
            },
            dimension: {
                x: 1,
                y: 1,
                z: 2
            },
            color: "#bada55"
        }
    ]
}
