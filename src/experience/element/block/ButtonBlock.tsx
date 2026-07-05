import { useMemo } from "react";
import { ButtonBlockModel } from "../../../data/model/element/block/ButtonBlock";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { Color, Vector3 } from "three";
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

const CHANNEL_COLORS: Record<ChannelID, string> = {
    [ChannelID.ChunkPrimary]:   '#00CCFF',
    [ChannelID.ChunkSecondary]: '#88AAFF',
    [ChannelID.LevelPrimary]:   '#EEEEFF',
};

export function ButtonBlock(props: ButtonBlockModel) {
    const [isPressed, setPressed] = useSensor(props.id, props.outputChannel);

    const channelHex = props.outputChannel ? CHANNEL_COLORS[props.outputChannel] : '#555555';

    const channelColorUniform = useUniform<Color>(new Color(channelHex));
    const lightColorUniform = useMemo(() => TSL.uniform(new Color('#E8E8E8')), []);
    const isActiveUniform = useUniform<number>(isPressed ? 1.0 : 0.0);
    const isActiveAlwaysOn = useMemo(() => TSL.uniform(1.0), []);
    const activeTimeUniform = useMemo(() => TSL.uniform(0), []);

    useFrame((_, delta) => {
        if (isPressed) activeTimeUniform.value += delta;
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
                onIntersectionEnter={() => setPressed(true)}
                onIntersectionExit={() => setPressed(false)}
            >
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[
                        props.dimension.x - 2*buttonPadding,
                        isPressed ? buttonHeightPressed*2 : buttonHeight*2,
                        props.dimension.z - 2*buttonPadding,
                    ]}/>
                    <meshStandardNodeMaterial colorNode={innerButtonColorNode} />
                </mesh>
            </CuboidCollider>
        </group>
    );
}
