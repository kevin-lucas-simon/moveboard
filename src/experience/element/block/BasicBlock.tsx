import {RigidBody} from "@react-three/rapier";
import {Vector3, Vector3Like} from "three";
import {GenericElementDefault} from "../GenericElement";
import {ElementModel} from "../../world/model/ElementModel";

export type BasicBlockModel = ElementModel & {
    dimension: Vector3Like,
    color: string,
}
export const BasicBlockDefault: BasicBlockModel = {
    ...GenericElementDefault,
    type: BasicBlock.name,
    dimension: {x: 1, y: 1, z: 1},
    color: "grey",
}

/**
 * Basic block with fixed position
 * @param props
 * @constructor
 */
export function BasicBlock(props: BasicBlockModel = BasicBlockDefault) {
    return (
        <RigidBody position={new Vector3().copy(props.position)} type={"fixed"}>
            <mesh>
                <boxGeometry args={new Vector3().copy(props.dimension).toArray()} />
                <meshStandardMaterial color={props.color} />
            </mesh>
        </RigidBody>
    );
}
