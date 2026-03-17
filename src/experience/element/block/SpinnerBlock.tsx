import {SpinnerBlockDefault, SpinnerBlockModel} from "../../../data/model/element/block/SpinnerBlockModel";
import {RapierRigidBody, RigidBody} from "@react-three/rapier";
import {useElementColoring} from "../../structure/coloring/useElementColoring";
import {Vector3} from "three";
import {useMemo, useRef} from "react";
import {useFrame} from "@react-three/fiber";
import {useSimulationSettings} from "../../debug/settings/SimulationSettingsProvider";
import {Angle} from "../../../data/model/Angle";

// @ts-ignore
import { abs, add, color, fract, length, mrt, mul, normalView, output, pass, positionLocal, sin, step, sub, time } from 'three/tsl';

const GlowingNodeMaterial = () => {
    // useMemo ist extrem wichtig, damit der TSL-Graph nicht bei jedem
    // React-Render-Zyklus neu aufgebaut wird!
    const colorNode = useMemo(() => {
        const _node0 = positionLocal;
        const _node1 = time;
        const _node2 = color("#0be941");
        const _node3 = mul(_node0, 5);
        const _node4 = fract(_node3);
        const _node5 = sub(_node4, 0.5);
        const _node6 = length(_node5);
        const _node7 = mul(_node6, 10);
        const _node8 = add(_node7, _node1);
        const _node9 = sin(_node8);
        const _node10 = abs(_node9);
        const _node11 = step(0.5, _node10);

        return mul(_node2, _node11);
    }, []);

    // @ts-ignore
    return <meshStandardNodeMaterial colorNode={colorNode} />;
};

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
                    <GlowingNodeMaterial />
                    {/*<meshStandardMaterial color={colorHex} />*/}
                </mesh>
            </RigidBody>

            {/*{isEditingMode && (*/}
            {/*    <mesh*/}
            {/*        position={new Vector3().copy(props.position)}*/}
            {/*        rotation={new Angle().copy(props.rotation).toEuler()}*/}
            {/*    >*/}
            {/*        <cylinderGeometry args={[spinnerLength, spinnerLength, props.dimension.y, 32]} />*/}
            {/*        <meshPhongMaterial color={colorHex} opacity={0.2} transparent/>*/}
            {/*    </mesh>*/}
            {/*)}*/}
        </>
    );
}
