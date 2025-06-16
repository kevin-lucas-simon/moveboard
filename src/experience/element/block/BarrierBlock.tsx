import {RigidBody} from "@react-three/rapier";
import {Vector3} from "three";
import {useDebugSettings} from "../../input/DebugSettingsProvider";
import {BarrierBlockDefault, BarrierBlockModel} from "../../../data/model/element/block/BarrierBlockModel";

export function BarrierBlock(props: BarrierBlockModel = BarrierBlockDefault) {
    const isVisible = useDebugSettings().displayEditorFeatures;

    return (
        <RigidBody position={new Vector3().copy(props.position)} type={"fixed"}>
            <mesh>
                <boxGeometry args={new Vector3().copy(props.dimension).toArray()} />
                <meshPhongMaterial color={'lightblue'} opacity={isVisible ? 0.25 : 0} transparent={true}/>
            </mesh>
        </RigidBody>
    );
}
