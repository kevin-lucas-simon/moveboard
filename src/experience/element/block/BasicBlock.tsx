import {RigidBody} from "@react-three/rapier";
import {Vector3} from "three";
import {BasicBlockDefault, BasicBlockModel} from "../../../data/model/element/block/BasicBlockModel";
import {useElementColoring} from "../../structure/coloring/useElementColoring";

export function BasicBlock(props: BasicBlockModel = BasicBlockDefault) {
    const colorHex = useElementColoring(props.color);

    return (
        <RigidBody position={new Vector3().copy(props.position)} type={"fixed"}>
            <mesh>
                <boxGeometry args={new Vector3().copy(props.dimension).toArray()} />
                <meshStandardMaterial color={colorHex} />
            </mesh>
        </RigidBody>
    );
}
