import {Vector3} from "three";
import React from "react";
import {JointModel} from "../../data/model/element/joint/JointModel";
import {CuboidCollider} from "@react-three/rapier";
import {RenderedChunk} from "./render/useChunkRenderer";
import {Element} from "./Element";
import {JointElement} from "../element/joint/JointElement";
import {ElementTypes} from "../../data/model/element/ElementTypes";
import {ChunkID} from "../../data/model/structure/spacial/ChunkModel";

export type ChunkProps = RenderedChunk & {
    active: boolean,
    onPlayerChunkLeave: (neighbour: ChunkID|null) => void,
    onPlayerOutOfBounds: () => void,
}
export function Chunk(props: ChunkProps) {
    const elements = Object.values(props.model.elements).filter(element => element.type !== ElementTypes.Joint);
    const joints = Object.values(props.model.elements).filter(element => element.type === ElementTypes.Joint) as JointModel[];

    return (
        <>
            {/* all displayed elements */}
            {elements.map((element) =>
                <Element
                    {...element}
                    key={element.id}
                    position={new Vector3().copy(props.worldPosition).add(element.position)}
                />)}
            {/* player chunk joint colliders */}
            {joints.map((joint: JointModel) =>
                <Element
                    {...joint}
                    key={joint.id}
                    position={new Vector3().copy(props.worldPosition).add(joint.position)}
                >
                    <JointElement
                        {...joint}
                        key={joint.id}
                        inActiveChunk={props.active}
                        position={new Vector3().copy(props.worldPosition).add(joint.position)}
                        chunkPosition={new Vector3().copy(props.worldPosition)}
                        onChunkLeave={props.onPlayerChunkLeave}
                    />
                </Element>
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