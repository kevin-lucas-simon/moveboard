import {Component} from "react";
import {RigidBody} from "@react-three/rapier";

export class BlockChunk extends Component {
    constructor(key, chunk, joint = null, joint_chunk = null) {
        super();

        this.key = key;
        if (!this.key) {
            console.error("No key for chunk given!", chunk)
        }

        this.config = chunk?.config ?? {}
        this.blocks = chunk?.blocks ?? []
        this.joints = chunk?.joints ?? []
        this.entities = chunk?.entities ?? []

        // get chunk dimensions
        let minPos = {x: 0, y: 0, z: 0}
        let maxPos = {x: 0, y: 0, z: 0}
        this.blocks.forEach(block => {
            minPos = {
                x: block.position.x < minPos.x ? block.position.x : minPos.x,
                y: block.position.y < minPos.y ? block.position.y : minPos.y,
                z: block.position.z < minPos.z ? block.position.z : minPos.z,
            }
            maxPos = {
                x: (block.position.x+block.dimension.x) > maxPos.x ? (block.position.x+block.dimension.x) : maxPos.x,
                y: (block.position.y+block.dimension.y) > maxPos.y ? (block.position.y+block.dimension.y) : maxPos.y,
                z: (block.position.z+block.dimension.z) > maxPos.z ? (block.position.z+block.dimension.z) : maxPos.z,
            }
        })
        this.chunkDimension = {
            x: Math.abs(minPos.x) + Math.abs(maxPos.x),
            y: Math.abs(minPos.y) + Math.abs(maxPos.y),
            z: Math.abs(minPos.z) + Math.abs(maxPos.z),
        }

        // move block coordinates to positive numbers for easier calculation
        this.blocks.forEach(block => {
            block.position = {
                x: minPos.x >= 0 ? block.position.x : block.position.x-minPos.x,
                y: minPos.y >= 0 ? block.position.y : block.position.y-minPos.y,
                z: minPos.z >= 0 ? block.position.z : block.position.z-minPos.z,
            }
        })
        this.joints.forEach(joint => {
            joint.position = {
                x: minPos.x >= 0 ? joint.position.x : joint.position.x-minPos.x,
                y: minPos.y >= 0 ? joint.position.y : joint.position.y-minPos.y,
                z: minPos.z >= 0 ? joint.position.z : joint.position.z-minPos.z,
            }
        })

        // joint.direction
        if (!joint || joint.chunk !== this.key) {
            this.chunkPosition = {x: 0, y: 0, z:0}
        } else {
            this.joint = this.joints.find(x => x.chunk === joint_chunk) // TODO unschön, Übergabe muss anders erfolgen

            this.chunkPosition = {
                x: joint.position.x - this.joint.position.x
                    + (joint.direction === "+x" ? joint.dimension.x : 0)
                    + (joint.direction === "-x" ? -joint.dimension.x : 0)
                ,
                y: joint.position.y - this.joint.position.y
                    + (joint.direction === "+y" ? joint.dimension.y : 0)
                    + (joint.direction === "-y" ? -joint.dimension.y : 0)
                ,
                z: joint.position.z - this.joint.position.z
                    + (joint.direction === "+z" ? joint.dimension.z : 0)
                    + (joint.direction === "-z" ? -joint.dimension.z : 0)
                ,
            }
        }
    }

    renderBlock(key, blockData) { // TODO ne eigene Klasse wäre gut, die einmal "block:basic" als auch "joint:basic" simuliert (letzteres erbt vom ersteren!)
        if (!key) {
            console.error("No key for block given!", blockData)
        }
        switch (blockData.type) {
            case "block:basic": { // TODO vlt wäre die switch case methode in Datentypen zu automatisieren ziemlich nice?
                return (
                    <RigidBody key={key} type={"fixed"}>
                        <mesh position={[
                            blockData.position.x + Math.abs(blockData.dimension.x) / 2 + this.chunkPosition.x,
                            blockData.position.y + Math.abs(blockData.dimension.y) / 2 + this.chunkPosition.y,
                            blockData.position.z + Math.abs(blockData.dimension.z) / 2 + this.chunkPosition.z,
                        ]}>
                            <boxGeometry args={[
                                Math.abs(blockData.dimension.x),
                                Math.abs(blockData.dimension.y),
                                Math.abs(blockData.dimension.z),
                            ]} />
                            <meshStandardMaterial color={blockData.color ?? 'grey'} />
                        </mesh>
                    </RigidBody>
                );
            }
            default: {
                console.error("Block type not found!", blockData.type)
                return;
            }
        }
    }

    render() {
        return this.blocks.map((block, index) => {
            return this.renderBlock(this.key+index, block)
        });
    }
}
