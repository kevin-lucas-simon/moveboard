import { useMemo } from "react";
import { Color } from "three";
import * as TSL from 'three/tsl';
import { TSLNode } from "@react-three/fiber/webgpu";
import { useUniform } from "./useUniform";

// Tile grid with grout lines — maps to any box face via normalLocal.
// tileColor fills each tile, groutColor fills the joints between tiles.
export function useNodeTile(props: {
    tileColor: string;
    groutColor: string;
    tileFrequency?: number;
    groutWidth?: number;
}): TSLNode {
    const tileColorUniform  = useUniform<Color>(new Color(props.tileColor));
    const groutColorUniform = useUniform<Color>(new Color(props.groutColor));
    const freqUniform       = useUniform<number>(props.tileFrequency ?? 2.0);
    const groutWidthUniform = useUniform<number>(props.groutWidth ?? 0.12);

    return useMemo(() => {
        const scaledPos = TSL.mul(TSL.positionLocal, freqUniform);
        const groutHalf = TSL.mul(groutWidthUniform, 0.5);
        const tileEnd   = TSL.sub(1.0, groutHalf);

        const fracX = TSL.fract(scaledPos.x);
        const fracY = TSL.fract(scaledPos.y);
        const fracZ = TSL.fract(scaledPos.z);

        // inTile = 1 inside the tile body, 0 on grout lines
        const inTileX = TSL.mul(TSL.step(groutHalf, fracX), TSL.step(fracX, tileEnd));
        const inTileY = TSL.mul(TSL.step(groutHalf, fracY), TSL.step(fracY, tileEnd));
        const inTileZ = TSL.mul(TSL.step(groutHalf, fracZ), TSL.step(fracZ, tileEnd));

        // Each face uses two UV axes — combine per face
        const inTileXY = TSL.mul(inTileX, inTileY); // Z-dominant face (front/back)
        const inTileXZ = TSL.mul(inTileX, inTileZ); // Y-dominant face (top/bottom)
        const inTileYZ = TSL.mul(inTileY, inTileZ); // X-dominant face (left/right)

        // Select the correct axis pair by the face whose normal is dominant
        const normalAbs   = TSL.abs(TSL.normalLocal);
        const dominantIsY = TSL.mul(TSL.step(normalAbs.x, normalAbs.y), TSL.step(normalAbs.z, normalAbs.y));
        const dominantIsX = TSL.mul(TSL.step(normalAbs.y, normalAbs.x), TSL.step(normalAbs.z, normalAbs.x));

        const tilePattern = TSL.mix(
            TSL.mix(inTileXY, inTileXZ, dominantIsY),
            inTileYZ,
            dominantIsX,
        );

        return TSL.mix(groutColorUniform, tileColorUniform, tilePattern);
    }, [tileColorUniform, groutColorUniform, freqUniform, groutWidthUniform]);
}
