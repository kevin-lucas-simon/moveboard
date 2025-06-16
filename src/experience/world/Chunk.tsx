import {Vector3} from "three";
import React from "react";
import {elementConfig, elementFallbackConfig} from "../../config/elementConfig";
import {Joint} from "./Joint";
import {JointModel} from "../../data/model/world/JointModel";
import {ElementModel} from "../../data/model/element/ElementModel";
import {CuboidCollider} from "@react-three/rapier";
import {RenderedChunk} from "./render/useChunkRenderer";
import {ChunkID} from "../../data/model/world/ChunkModel";
import {ElementType} from "../../data/model/element/ElementType";

export type ChunkProps = RenderedChunk & {
    active: boolean,
    onPlayerChunkLeave: (neighbour: ChunkID|null) => void,
    onPlayerOutOfBounds: () => void,
}
export function Chunk(props: ChunkProps) {
    const createChunkElement = (model: ElementModel) => {
        const position = new Vector3()
            .copy(props.worldPosition)
            .add(model.position)
        ;
        const component = elementConfig[model.type as ElementType]?.experienceComponent ?? elementFallbackConfig.experienceComponent;

        return React.createElement(component, {
            ...model,
            key: model.id,
            position: position,
        });
    }

    return (
        <>
            {/* all displayed elements */}
            {Object.values(props.model.elements).map((element) => createChunkElement(element))}
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