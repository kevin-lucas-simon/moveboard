import {RandomJointModel} from "../../../data/model/element/joint/RandomJointModel";
import {Vector3} from "three";
import {JointColliderElement} from "./JointColliderElement";

import {ChunkID} from "../../../data/model/structure/spacial/ChunkModel";

// fixed collider/debug size, matching DebugChunkAnchorJoint's anchor box - not part of the persisted model
const RANDOM_JOINT_DIMENSION = new Vector3(9, 1, 1);

export type RandomJointProps = RandomJointModel & {
    inActiveChunk: boolean,
    chunkPosition: Vector3,
    onChunkLeave: (neighbour: ChunkID|null) => void,
}

export function RandomJointElement(props: RandomJointProps) {
    return (
        <JointColliderElement
            {...props}
            dimension={RANDOM_JOINT_DIMENSION}
            debugColor={"yellow"}
        />
    );
}
