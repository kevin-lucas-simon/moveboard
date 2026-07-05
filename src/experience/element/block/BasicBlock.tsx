import {RigidBody} from "@react-three/rapier";
import {Vector3} from "three";
import {BasicBlockDefault, BasicBlockModel} from "../../../data/model/element/block/BasicBlockModel";
import {useElementColoring} from "../../structure/coloring/useElementColoring";
import {Angle} from "../../../data/model/Angle";
import {ColorTypes} from "../../../data/model/Color";
import {useNodeTile} from "../../material/useNodeTile";

export function BasicBlock(props: BasicBlockModel = BasicBlockDefault) {
    const tileHex  = useElementColoring(props.color);
    const groutHex = useElementColoring(ColorTypes.Dark);

    const nodeTile = useNodeTile({ tileColor: tileHex, groutColor: groutHex });

    return (
        <RigidBody
            key={JSON.stringify(props)}
            position={new Vector3().copy(props.position)}
            rotation={new Angle().copy(props.rotation).toEuler()}
            type={"fixed"}
        >
            <mesh castShadow receiveShadow>
                <boxGeometry args={new Vector3().copy(props.dimension).toArray()} />
                <meshStandardNodeMaterial colorNode={nodeTile} />
            </mesh>
        </RigidBody>
    );
}
