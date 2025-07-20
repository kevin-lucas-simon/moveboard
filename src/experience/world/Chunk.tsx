import {Vector3} from "three";
import React from "react";
import {Joint} from "./Joint";
import {JointModel} from "../../data/model/world/JointModel";
import {CuboidCollider} from "@react-three/rapier";
import {RenderedChunk} from "./render/useChunkRenderer";
import {ChunkID} from "../../data/model/world/ChunkModel";
import {Element} from "./Element";

export type ChunkProps = RenderedChunk & {
    active: boolean,
    onPlayerChunkLeave: (neighbour: ChunkID|null) => void,
    onPlayerOutOfBounds: () => void,
}
export function Chunk(props: ChunkProps) {
    return (
        <>
            {/* all displayed elements */}
            {Object.values(props.model.elements).map((element) =>
                <Element
                    {...element}
                    key={element.id}
                    position={new Vector3().copy(props.worldPosition).add(element.position)}
                />)}
            {/* player chunk joint colliders */}
            {Object.values(props.model.joints).map((joint: JointModel) =>
                <Joint
                    {...joint}
                    key={props.model.name + "->" + joint.neighbour}
                    inActiveChunk={props.active}
                    position={new Vector3().copy(props.worldPosition).add(joint.position)}
                    chunkPosition={new Vector3().copy(props.worldPosition)}
                    onChunkLeave={props.onPlayerChunkLeave}
                />
            )}
            {/* player out of bounds collider */}
            {props.active &&
                <CuboidCollider
                    sensor={true}
                    onIntersectionExit={props.onPlayerOutOfBounds}
                    args={new Vector3().copy(props.chunkDimension.size).addScalar(100).toArray()}
                    position={new Vector3().copy(props.chunkDimension.centerPosition)}
                />
            }
        </>
    );
}