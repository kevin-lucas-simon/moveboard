import { useMemo, useRef } from "react";
import { ButtonBlockModel } from "../../../data/model/element/block/ButtonBlock";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { Color, Mesh, Vector3 } from "three";
import { Angle } from "../../../data/model/Angle";
import { useNodeBorder } from "../../material/useNodeBorder";
import { useNodeNoiseMembrane } from "../../material/useNodeNoiseMembrane";
import { useSensor } from "../../reducer/SensorReactorProvider";
import { useUniform } from "../../material/useUniform";
import { ChannelID } from "../../../data/model/element/marker/ChannelID";
import { useFrame } from "@react-three/fiber";
import * as TSL from 'three/tsl';

const buttonPadding = 0.1;
const buttonHeight = 0.2;
const buttonHeightPressed = 0.05;
const buttonTravelDistance = buttonHeight - buttonHeightPressed;

const PRESS_SPEED = 18;
const RELEASE_SPEED = 2;
const SIGNAL_RELEASE_THRESHOLD = 0.05;

const CHANNEL_COLORS: Record<ChannelID, string> = {
    [ChannelID.ChunkPrimary]:   '#00CCFF',
    [ChannelID.ChunkSecondary]: '#88AAFF',
    [ChannelID.LevelPrimary]:   '#EEEEFF',
};

export function ButtonBlock(props: ButtonBlockModel) {
    const [, setSignalActive] = useSensor(props.id, props.outputChannel);

    const channelHex = props.outputChannel ? CHANNEL_COLORS[props.outputChannel] : '#555555';

    const channelColorUniform = useUniform<Color>(new Color(channelHex));
    const lightColorUniform = useMemo(() => TSL.uniform(new Color('#E8E8E8')), []);
    const isActiveUniform = useUniform<number>(0.0);
    const isActiveAlwaysOn = useMemo(() => TSL.uniform(1.0), []);
    const activeTimeUniform = useMemo(() => TSL.uniform(0), []);

    const innerMeshRef = useRef<Mesh>(null);
    const animTimeRef = useRef(0);           // linear 0→1, drives the smoothstep curve
    const intersectionCountRef = useRef(0);  // count allows multiple entities simultaneously
    const signalSentRef = useRef(false);

    useFrame((_, delta) => {
        const isPressing = intersectionCountRef.current > 0;
        const direction = isPressing ? 1 : -1;
        const speed = isPressing ? PRESS_SPEED : RELEASE_SPEED;

        animTimeRef.current = Math.max(0, Math.min(1,
            animTimeRef.current + direction * speed * delta
        ));

        // Smoothstep: velocity = 6t(1-t) → zero at both endpoints, peak at midpoint
        const animTime = animTimeRef.current;
        const pressAmount = animTime * animTime * (3 - 2 * animTime);

        if (innerMeshRef.current) {
            innerMeshRef.current.position.y = -pressAmount * buttonTravelDistance;
        }

        isActiveUniform.value = pressAmount;
        if (pressAmount > 0) activeTimeUniform.value += delta;

        // Signal deactivates only when the release animation has nearly completed
        const shouldSignal = isPressing || pressAmount > SIGNAL_RELEASE_THRESHOLD;
        if (shouldSignal && !signalSentRef.current) {
            setSignalActive(true);
            signalSentRef.current = true;
        } else if (!shouldSignal && signalSentRef.current) {
            setSignalActive(false);
            signalSentRef.current = false;
        }
    });

    const noiseNode = useNodeNoiseMembrane({
        activeTime: activeTimeUniform,
        channelColor: channelColorUniform,
        lightColor: lightColorUniform,
        isActive: isActiveUniform,
        blockDimension: props.dimension,
        lineScale: 4,
        lineThickness: 0.4,
    });

    const innerNoiseNode = useNodeNoiseMembrane({
        activeTime: activeTimeUniform,
        channelColor: channelColorUniform,
        lightColor: lightColorUniform,
        isActive: isActiveAlwaysOn,
        blockDimension: props.dimension,
        lineScale: 4,
        lineThickness: 0.4,
    });

    // When active: border blends into inner noise → invisible. When inactive: channel-colored border visible.
    const borderColorNode = TSL.mix(channelColorUniform, noiseNode, isActiveUniform);

    const nodeBorder = useNodeBorder({
        blockDimension: props.dimension,
        borderThickness: 0.1,
        borderColor: borderColorNode,
        innerColor: noiseNode,
    });

    // When active: solid channel color. When inactive: channel-dominant stripes.
    const innerButtonColorNode = TSL.mix(innerNoiseNode, channelColorUniform, isActiveUniform);

    // TODO Rename ButtonBlock to ButtonSensor

    return (
        <group
            position={new Vector3().copy(props.position)}
            rotation={new Angle().copy(props.rotation).toEuler()}
        >
            <RigidBody
                key={JSON.stringify(props)}
                type={"fixed"}
            >
                <mesh castShadow receiveShadow>
                    <boxGeometry args={new Vector3().copy(props.dimension).toArray()} />
                    <meshStandardNodeMaterial colorNode={nodeBorder} />
                </mesh>
            </RigidBody>

            <CuboidCollider
                sensor={true}
                position={[0, props.dimension.y/2, 0]}
                args={[
                    (props.dimension.x - 2*buttonPadding)/2,
                    buttonHeight,
                    (props.dimension.z - 2*buttonPadding)/2,
                ]}
                onIntersectionEnter={() => { intersectionCountRef.current += 1; }}
                onIntersectionExit={() => { intersectionCountRef.current -= 1; }}
            >
                <mesh ref={innerMeshRef} castShadow receiveShadow>
                    <boxGeometry args={[
                        props.dimension.x - 2*buttonPadding,
                        buttonHeight * 2,
                        props.dimension.z - 2*buttonPadding,
                    ]}/>
                    <meshStandardNodeMaterial colorNode={innerButtonColorNode} />
                </mesh>
            </CuboidCollider>
        </group>
    );
}
