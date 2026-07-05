import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { Color, Vector3 } from "three";
import * as TSL from 'three/tsl';
import { DoorBlockModel } from "../../../data/model/element/block/DoorBlockModel";
import { Angle } from "../../../data/model/Angle";
import { useNodeBorder, useNodeBorderMask } from "../../material/useNodeBorder";
import { useSensorReactor } from "../../reducer/SensorReactorProvider";
import { useUniform } from "../../material/useUniform";
import { ChannelID } from "../../../data/model/element/marker/ChannelID";
import {useElementColoring} from "../../structure/coloring/useElementColoring";
import {ColorTypes} from "../../../data/model/Color";

const BORDER_THICKNESS = 0.1;

const CHANNEL_COLORS: Record<ChannelID, string> = {
    [ChannelID.ChunkPrimary]:   '#00CCFF',
    [ChannelID.ChunkSecondary]: '#88AAFF',
    [ChannelID.LevelPrimary]:   '#EEEEFF',
};

export function DoorBlock(props: DoorBlockModel) {
    const baseColor = useElementColoring(ColorTypes.Light)

    const active = useSensorReactor(props.inputChannel);

    const channelHex = props.inputChannel ? CHANNEL_COLORS[props.inputChannel] : '#555555';

    const channelColorUniform = useUniform<Color>(new Color(channelHex));
    const baseColorUniform    = useUniform<Color>(new Color(baseColor));
    const transitionUniform   = useMemo(() => TSL.uniform(active ? 1.0 : 0.0), []);

    useFrame((_, delta) => {
        const transitionTarget = active ? 1.0 : 0.0;
        const transitionSpeed  = 3.0;
        transitionUniform.value += (transitionTarget - transitionUniform.value) * Math.min(delta * transitionSpeed, 1.0);
    });

    // Color: base grey for inner, channel color for border
    const colorNode = useNodeBorder({
        blockDimension: props.dimension,
        borderThickness: BORDER_THICKNESS,
        borderColor: channelColorUniform,
        innerColor: baseColorUniform,
    });

    // Border mask: 1 = border pixel, 0 = inner pixel — drives opacity separately from color
    const borderMask = useNodeBorderMask({
        blockDimension: props.dimension,
        borderThickness: BORDER_THICKNESS,
    });

    // Pulse: [0.25, 1.0] oscillation at ~1 pulse per second
    const pulseValue = useMemo(() => TSL.add(TSL.mul(TSL.sin(TSL.mul(TSL.time, 6.28)), 0.375), 0.625), []);

    // Opacity:
    // - closed (transition=0): all pixels solid (1.0)
    // - open   (transition=1): inner = 0.0, border = pulseValue
    const openStateOpacity = useMemo(() => TSL.mul(borderMask, pulseValue), [borderMask, pulseValue]);
    const opacityNode      = useMemo(() => TSL.mix(1.0, openStateOpacity, transitionUniform), [openStateOpacity, transitionUniform]);

    return (
        <group
            position={new Vector3().copy(props.position)}
            rotation={new Angle().copy(props.rotation).toEuler()}
        >
            {/* Physics: present when inactive (closed), removed when active (open) */}
            {!active && (
                <RigidBody key={JSON.stringify(props)} type="fixed">
                    <CuboidCollider args={[
                        props.dimension.x / 2,
                        props.dimension.y / 2,
                        props.dimension.z / 2,
                    ]} />
                </RigidBody>
            )}

            {/* Visual: always rendered — dissolves to a pulsing border outline when open */}
            <mesh castShadow={!active} receiveShadow>
                <boxGeometry args={new Vector3().copy(props.dimension).toArray()} />
                <meshStandardNodeMaterial
                    colorNode={colorNode}
                    opacityNode={opacityNode}
                    transparent={true}
                />
            </mesh>
        </group>
    );
}
