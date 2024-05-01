export default {
    name: "next",
    type: "chunk:block",
    joints: [
        {
            type: "joint:block",
            chunk: "start",
            direction: "-z",
            position: {
                x: 0,
                y: 0,
                z: 0
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
                x: 0,
                y: -1,
                z: 0
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
