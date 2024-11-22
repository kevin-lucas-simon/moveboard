import {NewBasicBlockModel} from "../NewElementModel";
import {RigidBody} from "@react-three/rapier";
import {Vector3} from "three";

export type NewBasicBlockProps = NewBasicBlockModel;
export function NewBasicBlock(props: NewBasicBlockProps) {
    return (
        <RigidBody position={new Vector3().copy(props.position)} type={"fixed"}>
            <mesh>
                <boxGeometry args={new Vector3().copy(props.dimension).toArray()} />
                <meshStandardMaterial color={props.color ?? "grey"} />
            </mesh>
        </RigidBody>
    );
}
