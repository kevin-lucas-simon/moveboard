import {RigidBody} from "@react-three/rapier";
import {Vector3} from "three";
import {BasicBlockDefault, BasicBlockModel} from "../../../data/model/element/block/BasicBlockModel";

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
