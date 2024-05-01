import {Vector3} from "three";
import {BasicBlock} from "../blocks/BasicBlock";
import {DebugJointBlock} from "../blocks/DebugJointBlock";

export function BlockChunk({chunkData, jointOrigin = null, jointData = null}) {
    if (!chunkData.name) {
        console.error("No name for chunk given!", chunkData)
    }

    const name = chunkData.name
    const blocks = chunkData.blocks ?? []
    const joints = chunkData.joints ?? []

    const dimension = calculateChunkDimensions(blocks)
    const position = calculateChunkPosition(name, joints, jointOrigin, jointData)

    function calculateChunkDimensions(blocks) {
        let minPos = new Vector3(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
        let maxPos = new Vector3(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
        blocks.forEach(block => {
            minPos = new Vector3(
                Math.min(minPos.x, block.position.x),
                Math.min(minPos.y, block.position.y),
                Math.min(minPos.z, block.position.z),
            )
            maxPos = new Vector3(
                Math.max(maxPos.x, block.position.x + block.dimension.x),
                Math.max(maxPos.y, block.position.y + block.dimension.y),
                Math.max(maxPos.z, block.position.z + block.dimension.z),
            )
        })
        return new Vector3(
            Math.abs(maxPos.x - minPos.x),
            Math.abs(maxPos.y - minPos.y),
            Math.abs(maxPos.z - minPos.z),
        )
    }

    function calculateChunkPosition(ourChunkName, ourJoints, neighbourChunkName, neighbourJoint) {
        if (!neighbourJoint || neighbourJoint.chunk !== ourChunkName) {
            return new Vector3(0,0,0)
        } else {
            const ourJoint = ourJoints.find(joint => joint.chunk === neighbourChunkName)

            return new Vector3(
                neighbourJoint.position.x - ourJoint.position.x
                + (neighbourJoint.direction === "+x" ? neighbourJoint.dimension.x : 0)
                + (neighbourJoint.direction === "-x" ? -neighbourJoint.dimension.x : 0)
                ,
                neighbourJoint.position.y - ourJoint.position.y
                + (neighbourJoint.direction === "+y" ? neighbourJoint.dimension.y : 0)
                + (neighbourJoint.direction === "-y" ? -neighbourJoint.dimension.y : 0)
                ,
                neighbourJoint.position.z - ourJoint.position.z
                + (neighbourJoint.direction === "+z" ? neighbourJoint.dimension.z : 0)
                + (neighbourJoint.direction === "-z" ? -neighbourJoint.dimension.z : 0)
            )
        }
    }

    function initializeBlocks(key, blocks, chunkPosition) {
        const initializedBlocks = []
        blocks.forEach((block, index) => {
            switch (block.type) {
                case "block:basic": {
                    initializedBlocks.push(
                        <BasicBlock
                            key={key+index}
                            position={new Vector3(block.position.x, block.position.y, block.position.z).add(chunkPosition)}
                            dimension={new Vector3(block.dimension.x, block.dimension.y, block.dimension.z)}
                            color={block.color}
                        />
                    )
                    break
                }
                case "joint:block": {
                    initializedBlocks.push(
                        <DebugJointBlock
                            key={key+index}
                            position={new Vector3(block.position.x, block.position.y, block.position.z).add(chunkPosition)}
                            dimension={new Vector3(block.dimension.x, block.dimension.y, block.dimension.z)}
                        />
                    )
                    break
                }
                default: {
                    console.error("Block type not found!", block.type)
                    break
                }
            }
        })
        return initializedBlocks
    }

    return [
        ...initializeBlocks(name, blocks, position),
        ...initializeBlocks(name+"debug", joints, position)
    ]
}