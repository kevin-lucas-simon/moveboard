import {Vector3} from "three";
import {BlockLoader} from "../BlockLoader";
import {CuboidCollider, RigidBody} from "@react-three/rapier";

export function BlockChunk({chunkData, jointOriginChunk = null, jointData = null}) {
    if (!chunkData.name) {
        console.error("No name for chunk given!", chunkData)
    }

    const chunkName = chunkData.name
    const chunkBlocks = chunkData.blocks ?? []
    const chunkJoints = chunkData.joints ?? []

    const { center: chunkCenter, dimension: chunkDimension } = calculateChunkSizing(chunkBlocks);

    // TODO hier sollen die chunkWorldPosition vom NeighbourChunk miteinander verrechnet werden.
    // jedoch fehlt mir gerade ne gute Übergabe zu, wie ich die Koordinate vom anderen Joint bekomme
    // vlt die joint collision und creation doch im Loader auslagern?
    const chunkWorldPosition = calculateChunkWorldPosition(chunkName, chunkJoints, jointOriginChunk, jointData)

    return (
        <RigidBody type={"fixed"}>
            {[...chunkBlocks, ...chunkJoints].map((block, index) =>
                <BlockLoader
                    type={block.type}
                    key={chunkName+index}
                    position={new Vector3(block.position.x, block.position.y, block.position.z).add(chunkWorldPosition)}
                    dimension={new Vector3(block.dimension.x, block.dimension.y, block.dimension.z)}
                    color={block.color}
                />
            )}
            <CuboidCollider
                args={new Vector3().copy(chunkDimension).multiplyScalar(0.5).toArray()}
                position={chunkCenter}
                sensor
                onIntersectionExit={() => console.log("exit chunk " + chunkName)}
            />
        </RigidBody>
    )

    function calculateChunkSizing(blocks) {
        // special case with no blocks
        if (!Array.isArray(blocks) || blocks.length === 0) {
            return {
                center: new Vector3(0,0,0),
                dimension: new Vector3(0,0,0),
            };
        }

        // define boundary helpers
        const minPos = new Vector3(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
        const maxPos = new Vector3(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);

        // check if block sizes are intercepting boundary helper
        blocks.forEach(block => {
            minPos.x = Math.min(minPos.x, block.position.x - block.dimension.x/2)
            minPos.y = Math.min(minPos.y, block.position.y - block.dimension.y/2)
            minPos.z = Math.min(minPos.z, block.position.z - block.dimension.z/2)

            maxPos.x = Math.max(maxPos.x, block.position.x + block.dimension.x/2)
            maxPos.y = Math.max(maxPos.y, block.position.y + block.dimension.y/2)
            maxPos.z = Math.max(maxPos.z, block.position.z + block.dimension.z/2)
        })

        // return calculated center and dimension
        return {
            center: new Vector3(
                (minPos.x + maxPos.x)/2,
                (minPos.y + maxPos.y)/2,
                (minPos.z + maxPos.z)/2,
            ),
            dimension: new Vector3(
                Math.abs(minPos.x) + Math.abs(maxPos.x),
                Math.abs(minPos.y) + Math.abs(maxPos.y),
                Math.abs(minPos.z) + Math.abs(maxPos.z),
            ),
        };
    }

    function calculateChunkWorldPosition(ourChunkName, ourJoints, neighbourChunk, neighbourJoint) {
        if (!neighbourJoint || neighbourJoint.chunk !== ourChunkName) {
            return new Vector3(0,0,0)
        } else {
            const ourJoint = ourJoints.find(joint => joint.chunk === neighbourChunk.name)

            return new Vector3(
                neighbourJoint.position.x - ourJoint.position.x,
                neighbourJoint.position.y - ourJoint.position.y,
                neighbourJoint.position.z - ourJoint.position.z,
            )
        }
    }
}