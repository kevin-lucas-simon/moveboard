import { useMemo } from "react";
import { Color } from "three";
import * as TSL from 'three/tsl';
import { TSLNode } from "@react-three/fiber/webgpu";
import { useUniform } from "./useUniform";

// Diagonal stripes alternating between two colors — inspired by U-Bahn mosaic diagonals.
// The X+Z diagonal gives a natural spinning stripe effect when the block rotates around Y.
export function useNodeGeometricStripes(props: {
    primaryColor: string;
    accentColor: string;
    stripeFrequency?: number;
}): TSLNode {
    const primaryColorUniform = useUniform<Color>(new Color(props.primaryColor));
    const accentColorUniform  = useUniform<Color>(new Color(props.accentColor));
    const freqUniform         = useUniform<number>(props.stripeFrequency ?? 2.5);

    return useMemo(() => {
        // True 3D diagonal across all axes — looks 45° from any viewing direction
        const diagonal    = TSL.add(TSL.positionLocal.x, TSL.add(TSL.positionLocal.y, TSL.positionLocal.z));
        const scaledDiag  = TSL.mul(diagonal, freqUniform);
        const fracDiag    = TSL.fract(scaledDiag);

        // Sharp stripe boundary: step at 0.5 alternates between two colors every half-period
        const isAccent = TSL.step(0.5, fracDiag);

        return TSL.mix(primaryColorUniform, accentColorUniform, isAccent);
    }, [primaryColorUniform, accentColorUniform, freqUniform]);
}
