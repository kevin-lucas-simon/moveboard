import {Component} from "react";
import {BasicBlock} from "./blocks/BasicBlock";
import {Vector3} from "three";

export class BlockChunk extends Component {
    constructor(key, chunkData, jointKey = null, jointData = null) {
        super();
        if (!key) {
            console.error("No key for chunk given!", chunkData)
        }

        this.blocks = chunkData.blocks ?? []
        this.joints = chunkData.joints ?? []

        // TODO refactor
        this.dimension = this.calculateChunkDimensions(this.blocks)
        this.position = this.calculateChunkPosition(key, this.joints, jointKey, jointData)
        this.renderBlocks = this.initializeBlocks(key, this.blocks, this.position)
    }

    render() {
        return this.renderBlocks.map((block, index) => {
            return block.render()
        });
    }

    calculateChunkDimensions(blocks) {
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

    calculateChunkPosition(ourKey, ourJoints, neighbourJointKey, neighbourJoint) {
        if (!neighbourJoint || neighbourJoint.chunk !== ourKey) {
            return new Vector3(0,0,0)
        } else {
            const ourJoint = ourJoints.find(x => x.chunk === neighbourJointKey)

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

    initializeBlocks(key, blocks, chunkPosition) {
        const initializedBlocks = []
        blocks.forEach((block, index) => {
            switch (block.type) {
                case "block:basic": {
                    initializedBlocks.push(new BasicBlock(
                        key+index,
                        new Vector3(block.position.x, block.position.y, block.position.z).add(chunkPosition),
                        new Vector3(block.dimension.x, block.dimension.y, block.dimension.z),
                        block.color,
                    ))
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
}
