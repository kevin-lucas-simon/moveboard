export default {
    name: "next",
    type: "chunk:block",
    joints: [
        {
            type: "joint:block",
            chunk: "start",
            position: {
                x: 1,
                y: 0,
                z: -0.5
            },
            dimension: {
                x: 2,
                y: 1,
                z: 1
            },
            color: "#bada55"
        }
    ],
    blocks: [
        {
            type: "block:basic",
            position: {
                x: 2,
                y: -1,
                z: 2
            },
            dimension: {
                x: 5,
                y: 1,
                z: 5
            },
            color: "#ff8888"
        },
    ]
}
