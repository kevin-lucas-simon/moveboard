import {RigidBody} from "@react-three/rapier";
import {Vector3} from "three";
import {useSimulationSettings} from "../../debug/settings/SimulationSettingsProvider";
import {BarrierBlockDefault, BarrierBlockModel} from "../../../data/model/element/block/BarrierBlockModel";
import {useEditorSelectedChunkElements} from "../../../editor/reducer/EditorProvider";

export function BarrierBlock(props: BarrierBlockModel = BarrierBlockDefault) {
    const isSelected = Object.keys(useEditorSelectedChunkElements()).includes(props.id);
    const isEditingMode = useSimulationSettings()?.isEditingMode;

    if (isEditingMode && !isSelected) {
        return null;
    }

    return (
        <RigidBody position={new Vector3().copy(props.position)} type={"fixed"}>
            <mesh>
                <boxGeometry args={new Vector3().copy(props.dimension).toArray()} />
                <meshPhongMaterial color={'lightgrey'} opacity={isSelected && isEditingMode ? 0.25 : 0} transparent={true}/>
            </mesh>
        </RigidBody>
    );
}
