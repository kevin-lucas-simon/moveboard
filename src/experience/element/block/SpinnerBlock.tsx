import {SpinnerBlockDefault, SpinnerBlockModel} from "../../../data/model/element/block/SpinnerBlockModel";
import {RapierRigidBody, RigidBody} from "@react-three/rapier";
import {useElementColoring} from "../../structure/coloring/useElementColoring";
import {Vector3} from "three";
import {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import {useSimulationSettings} from "../../debug/settings/SimulationSettingsProvider";

export function SpinnerBlock(props: SpinnerBlockModel = SpinnerBlockDefault) {
    const colorHex = useElementColoring(props.color);
    const spinnerRef = useRef<RapierRigidBody>(null);

    const isEditingMode = useSimulationSettings()?.isEditingMode;
    const spinnerLength = Math.max(props.dimension.x, props.dimension.z) / 2;

    useFrame((_, delta) => {
        if (spinnerRef.current) {
            spinnerRef.current.setAngvel(new Vector3(0, props.speed * delta, 0), true);
        }
    });

    return (
        <>
            <RigidBody
                name={"SpinnerBlock"}
                ref={spinnerRef}
                position={new Vector3().copy(props.position)}
                type={isEditingMode ? "fixed" : "kinematicVelocity"}
                colliders={"cuboid"}
            >
                <mesh castShadow receiveShadow>
                    <boxGeometry args={new Vector3().copy(props.dimension).toArray()} />
                    <meshStandardMaterial color={colorHex} />
                </mesh>
            </RigidBody>

            {isEditingMode && (
                <mesh position={new Vector3().copy(props.position)}>
                    <cylinderGeometry args={[spinnerLength, spinnerLength, props.dimension.y, 32]} />
                    <meshPhongMaterial color={colorHex} opacity={0.1} transparent/>
                </mesh>
            )}
        </>
    );
}
