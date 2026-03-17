import {RigidBody} from "@react-three/rapier";
import {Vector3} from "three";
import {BasicBlockDefault, BasicBlockModel} from "../../../data/model/element/block/BasicBlockModel";
import {useElementColoring} from "../../structure/coloring/useElementColoring";
import {Angle} from "../../../data/model/Angle";

export function BasicBlock(props: BasicBlockModel = BasicBlockDefault) {
    const colorHex = useElementColoring(props.color);

    return (
        <RigidBody
            position={new Vector3().copy(props.position)}
            rotation={new Angle().copy(props.rotation).toEuler()}
            type={"fixed"}
        >
            <mesh castShadow receiveShadow>
                <boxGeometry args={new Vector3().copy(props.dimension).toArray()} />
                <meshStandardMaterial color={colorHex} />
            </mesh>
        </RigidBody>
    );
}
