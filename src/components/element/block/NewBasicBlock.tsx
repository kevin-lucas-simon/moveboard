import {NewElementModel} from "../NewElementModel";
import {RigidBody} from "@react-three/rapier";
import {Vector3, Vector3Like} from "three";

export type NewBasicBlockModel = NewElementModel & {
    dimension: Vector3Like,
    color?: string,
}

export function NewBasicBlock(props: NewBasicBlockModel) {
    return (
        <RigidBody position={new Vector3().copy(props.position)} type={"fixed"}>
            <mesh>
                <boxGeometry args={new Vector3().copy(props.dimension).toArray()} />
                <meshStandardMaterial color={props.color ?? "grey"} />
            </mesh>
        </RigidBody>
    );
}
