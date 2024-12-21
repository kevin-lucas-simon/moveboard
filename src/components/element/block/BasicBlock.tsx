import {ElementModel} from "../ElementModel";
import {RigidBody} from "@react-three/rapier";
import {Vector3, Vector3Like} from "three";

export type BasicBlockModel = ElementModel & {
    dimension: Vector3Like,
    color?: string,
}

/**
 * Basic block with fixed position
 * @param props
 * @constructor
 */
export function BasicBlock(props: BasicBlockModel) {
    return (
        <RigidBody position={new Vector3().copy(props.position)} type={"fixed"}>
            <mesh>
                <boxGeometry args={new Vector3().copy(props.dimension).toArray()} />
                <meshStandardMaterial color={props.color ?? "grey"} />
            </mesh>
        </RigidBody>
    );
}
