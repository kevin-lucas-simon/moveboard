import { useMemo } from "react";
import { Vector3, Vector3Like } from "three";
import * as TSL from 'three/tsl';
import { TSLNode } from "@react-three/fiber/webgpu";
import { useUniform } from "./useUniform";

// Flowing wave stripe pattern: organic, non-parallel bands animated via pausable time.
// Active state: channel color dominates / light stripes.
// Inactive state: light color dominates / channel-colored frozen stripes.
export function useNodeNoiseMembrane(props: {
    activeTime: TSLNode;
    channelColor: TSLNode;
    lightColor: TSLNode;
    isActive: TSLNode;
    blockDimension: Vector3Like;
    lineScale: number;
    lineThickness: number;
}): TSLNode {
    const dimensionUniform     = useUniform<Vector3>(new Vector3().copy(props.blockDimension));
    const waveFrequencyUniform = useUniform<number>(props.lineScale);
    const lineThicknessUniform = useUniform<number>(props.lineThickness);

    return useMemo(() => {
        const halfDimension       = TSL.mul(dimensionUniform, 0.5);
        const normalizedPosition  = TSL.div(TSL.positionLocal, halfDimension);

        const time = props.activeTime;

        // 3D warp: each term uses two axes so the distortion varies on every face
        const warpDisplacementYZ = TSL.mul(TSL.sin(TSL.add(
            TSL.add(TSL.mul(normalizedPosition.y, 2.5), TSL.mul(normalizedPosition.z, 1.5)),
            TSL.mul(time, 0.7)
        )), 0.35);
        const warpDisplacementXY = TSL.mul(TSL.cos(TSL.add(
            TSL.add(TSL.mul(normalizedPosition.x, 2.0), TSL.mul(normalizedPosition.y, 1.5)),
            TSL.mul(time, 0.9)
        )), 0.3);

        // 3D diagonal wave: x + 0.6y + z — each face gets a true diagonal cross-section
        const waveFlow = TSL.add(
            TSL.add(normalizedPosition.x, TSL.mul(normalizedPosition.y, 0.6)),
            TSL.add(normalizedPosition.z, TSL.add(warpDisplacementYZ, warpDisplacementXY))
        );

        const wave         = TSL.sin(TSL.add(TSL.mul(waveFlow, waveFrequencyUniform), TSL.mul(time, 2.5)));
        const absoluteWave = TSL.abs(wave);
        const lineMask     = TSL.step(lineThicknessUniform, absoluteWave);
        // lineMask = 0 → stripe/line color, lineMask = 1 → dominant color

        // Color inversion based on isActive:
        // inactive (0): light dominates, channel-colored lines frozen
        // active   (1): channel dominates, light lines flowing
        const dominantColor = TSL.mix(props.lightColor, props.channelColor, props.isActive);
        const stripeColor   = TSL.mix(props.channelColor, props.lightColor, props.isActive);

        return TSL.mix(stripeColor, dominantColor, lineMask);
    }, [props.activeTime, props.channelColor, props.lightColor, props.isActive, waveFrequencyUniform, lineThicknessUniform]);
}
