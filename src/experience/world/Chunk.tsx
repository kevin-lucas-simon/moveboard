import {ChunkModel} from "../../model/ChunkModel";
import {Vector3, Vector3Like} from "three";
import React from "react";
import {elementDefinition, elementFallback} from "../config/elementDefinition";
import {Joint} from "./Joint";
import {JointModel} from "../../model/JointModel";
import {ElementModel} from "../../model/ElementModel";
import {CuboidCollider} from "@react-three/rapier";

export type ChunkProps = ChunkModel & {
    active: boolean,
    position: Vector3Like,
    center: Vector3Like,
    dimension: Vector3Like,
    onPlayerChunkLeave: (neighbour: string) => void,
    onPlayerOutOfBounds: () => void,
}
export function Chunk(props: ChunkProps) {
    const createChunkElement = (model: ElementModel) => {
        const position = new Vector3()
            .copy(props.position)
            .add(model.position)
        ;
        const component = elementDefinition[model.type]?.experienceComponent ?? elementFallback.experienceComponent;

        return React.createElement(component, {...model,
            key: props.name+"_"+model.type+"_"+position.x+"_"+position.y+"_"+position.z,
            position: position,
        });
    }

    return (
        <>
            {/* all displayed elements */}
            {props.elements.map((element) => createChunkElement(element))}
            {/* player chunk joint colliders */}
            {props.joints.map((joint: JointModel) =>
                <Joint
                    {...joint}
                    key={props.name + "->" + joint.neighbour}
                    inActiveChunk={props.active}
                    position={new Vector3().copy(props.position).add(joint.position)}
                    chunkPosition={new Vector3().copy(props.position)}
                    onChunkLeave={props.onPlayerChunkLeave}
                />
            )}
            {/* player out of bounds collider */}
            {props.active &&
                <CuboidCollider
                    sensor={true}
                    onIntersectionExit={props.onPlayerOutOfBounds}
                    args={new Vector3().copy(props.dimension).addScalar(100).toArray()}
                    position={new Vector3().copy(props.center)}
                />
            }
        </>
    );
}