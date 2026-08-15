import {Vector3, Vector3Like} from "three";
import {useSimulationSettings} from "../settings/SimulationSettingsProvider";

export type DebugChunkAnchorJointProps = {
    activeChunkWorldPosition: Vector3Like;
}


export function DebugChunkAnchorJoint(props: DebugChunkAnchorJointProps) {
    const isVisible = useSimulationSettings()?.displayEditorFeatures;
    if (!isVisible) {
        return null;
    }

    return (
        <group position={new Vector3().copy(props.activeChunkWorldPosition)}>
            <mesh>
                <sphereGeometry args={[0.05]}/>
                <meshStandardMaterial color={"yellow"}/>
            </mesh>
            <mesh>
                <boxGeometry args={new Vector3(9,1,1).toArray()}/>
                <meshPhongMaterial color={"yellow"} opacity={0.25} transparent/>
            </mesh>
        </group>
    );
}
