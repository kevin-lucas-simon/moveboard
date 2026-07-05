import { useMemo } from "react";
import * as TSL from 'three/tsl';
import { TSLNode } from "@react-three/fiber/webgpu";

// Geometric tile grid whose frequency and color animate based on isActive.
// Inactive: sparse grid (channelColor lines on light background).
// Active:   dense grid (light lines on channel background).
export function useNodePulseGrid(props: {
    channelColor: TSLNode;
    lightColor: TSLNode;
    isActive: TSLNode;
    groutWidth?: number;
}): TSLNode {
    const groutHalfVal = (props.groutWidth ?? 0.15) / 2;

    return useMemo(() => {
        const scaledPos = TSL.mul(TSL.positionLocal, 4);
        const groutHalf = groutHalfVal;
        const tileEnd   = 1.0 - groutHalfVal;

        const fracX = TSL.fract(scaledPos.x);
        const fracY = TSL.fract(scaledPos.y);
        const fracZ = TSL.fract(scaledPos.z);

        // inTile = 1 inside tile body, 0 on grid lines
        const inTileX = TSL.mul(TSL.step(groutHalf, fracX), TSL.step(fracX, tileEnd));
        const inTileY = TSL.mul(TSL.step(groutHalf, fracY), TSL.step(fracY, tileEnd));
        const inTileZ = TSL.mul(TSL.step(groutHalf, fracZ), TSL.step(fracZ, tileEnd));

        // Face selection via dominant normal axis (same logic as useNodeTile)
        const normalAbs   = TSL.abs(TSL.normalLocal);
        const dominantIsY = TSL.mul(TSL.step(normalAbs.x, normalAbs.y), TSL.step(normalAbs.z, normalAbs.y));
        const dominantIsX = TSL.mul(TSL.step(normalAbs.y, normalAbs.x), TSL.step(normalAbs.z, normalAbs.x));

        const inTileXY = TSL.mul(inTileX, inTileY);
        const inTileXZ = TSL.mul(inTileX, inTileZ);
        const inTileYZ = TSL.mul(inTileY, inTileZ);

        const tilePattern = TSL.mix(
            TSL.mix(inTileXY, inTileXZ, dominantIsY),
            inTileYZ,
            dominantIsX,
        );

        // Color inversion: inactive → channel lines on light, active → light lines on channel
        const dominantColor = TSL.mix(props.lightColor,   props.channelColor, props.isActive);
        const gridLineColor = TSL.mix(props.channelColor, props.lightColor,   props.isActive);

        return TSL.mix(gridLineColor, dominantColor, tilePattern);
    }, [props.channelColor, props.lightColor, props.isActive]);
}
