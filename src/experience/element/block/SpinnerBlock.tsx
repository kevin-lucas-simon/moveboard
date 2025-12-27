import {SpinnerBlockDefault, SpinnerBlockModel} from "../../../data/model/element/block/SpinnerBlockModel";
import {RapierRigidBody, RigidBody} from "@react-three/rapier";
import {useElementColoring} from "../../structure/coloring/useElementColoring";
import {Vector3} from "three";
import {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import {useSimulationSettings} from "../../debug/settings/SimulationSettingsProvider";
import {Angle} from "../../../data/model/Angle";

export function SpinnerBlock(props: SpinnerBlockModel = SpinnerBlockDefault) {
    const colorHex = useElementColoring(props.color);
    const spinnerRef = useRef<RapierRigidBody>(null);

    const isEditingMode = useSimulationSettings()?.isEditingMode;
    const spinnerLength = Math.max(props.dimension.x, props.dimension.z) / 2;

    useFrame((_, delta) => {
        if (spinnerRef.current) {
            const initialRotation = new Angle().copy(props.rotation).toEuler();
            const spinnerAngle = new Vector3(0, props.speed * delta, 0).applyEuler(initialRotation);

            spinnerRef.current.setAngvel(spinnerAngle, true);
        }
    });

    return (
        <>
            <RigidBody
                ref={spinnerRef}
                position={new Vector3().copy(props.position)}
                rotation={new Angle().copy(props.rotation).toEuler()}
                type={isEditingMode ? "fixed" : "kinematicVelocity"}
            >
                <mesh castShadow receiveShadow>
                    <boxGeometry args={new Vector3().copy(props.dimension).toArray()} />
                    <meshStandardMaterial color={colorHex} />
                </mesh>
            </RigidBody>

            {isEditingMode && (
                <mesh
                    position={new Vector3().copy(props.position)}
                    rotation={new Angle().copy(props.rotation).toEuler()}
                >
                    <cylinderGeometry args={[spinnerLength, spinnerLength, props.dimension.y, 32]} />
                    <meshPhongMaterial color={colorHex} opacity={0.1} transparent/>
                </mesh>
            )}
        </>
    );
}
