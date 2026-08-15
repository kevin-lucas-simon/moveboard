import {StaticJointModel} from "../../../data/model/element/joint/StaticJointModel";
import {Vector3} from "three";
import {JointColliderElement} from "./JointColliderElement";

import {ChunkID} from "../../../data/model/structure/spacial/ChunkModel";

export type StaticJointProps = StaticJointModel & {
    inActiveChunk: boolean,
    chunkPosition: Vector3,
    onChunkLeave: (neighbour: ChunkID|null) => void,
}

export function StaticJointElement(props: StaticJointProps) {
    return (
        <JointColliderElement
            {...props}
            dimension={props.dimension}
            debugColor={"green"}
        />
    );
}
