import { useMemo } from "react";
import { Vector3, Vector3Like } from "three";
import * as TSL from 'three/tsl';
import {TSLNode} from "@react-three/fiber/webgpu";
import {useUniform} from "./useUniform";

export function useNodeBorder(props: {
    blockDimension: Vector3Like;
    borderThickness: number;
    borderColor: TSLNode;
    innerColor: TSLNode;
}): TSLNode {
    const dimension = useUniform<Vector3>(new Vector3().copy(props.blockDimension));
    const thickness = useUniform<number>(props.borderThickness);

    return useMemo(() => {
        const absolutePosition = TSL.abs(TSL.positionLocal);
        const boxDimension = TSL.mul(dimension, 0.5);

        const distanceToBorder = TSL.sub(boxDimension, absolutePosition);

        const isEdgeX = TSL.step(distanceToBorder.x, thickness);
        const isEdgeY = TSL.step(distanceToBorder.y, thickness);
        const isEdgeZ = TSL.step(distanceToBorder.z, thickness);
        const edgeCount = TSL.add(isEdgeX, isEdgeY, isEdgeZ);

        const isBorder = TSL.step(2.0, edgeCount);

        return TSL.mix(
            props.innerColor,
            props.borderColor,
            isBorder
        );
    }, [props.innerColor, props.borderColor]);
}