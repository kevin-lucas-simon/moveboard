import {useMemo} from "react";
import * as TSL from 'three/tsl';
import {Color} from "three";
import {TSLNode} from "@react-three/fiber/webgpu";
import {useUniform} from "./useUniform";

export function useNodeSwirl(props: {
    color: string
}): TSLNode {
    const colorNode = useUniform<Color>(new Color(props.color));

    return useMemo(() => {
        const positionLocal = TSL.positionLocal;
        const positionLocalMult5 = TSL.mul(positionLocal, 5);
        const time = TSL.time;
        const color = colorNode

        const fractWTF = TSL.fract(positionLocalMult5);
        const fractMinusPoint5 = TSL.sub(fractWTF, 0.5);
        const fractLength = TSL.length(fractMinusPoint5);
        const fractMult10 = TSL.mul(fractLength, 10);

        const fractWithTime = TSL.add(fractMult10, time);
        const fractTimeSinus = TSL.sin(fractWithTime);
        const fractAbsolute = TSL.abs(fractTimeSinus);
        const fractAbgetastet = TSL.step(0.5, fractAbsolute);

        return TSL.mul(color, fractAbgetastet);
    }, [colorNode]);
}
