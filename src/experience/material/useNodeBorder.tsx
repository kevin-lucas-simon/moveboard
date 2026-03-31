import { useEffect, useMemo } from "react";
import { Vector3, Vector3Like, Color } from "three";
import * as TSL from 'three/tsl';
import {TSLNode} from "@react-three/fiber/webgpu";

export function useNodeBorder(props: {
    blockDimension: Vector3Like;
    borderThickness: number;
    borderColor: string;
    innerColor: TSLNode;
}): TSLNode {
    const uniforms = useMemo(() => ({
        dimension: TSL.uniform(new Vector3(props.blockDimension.x, props.blockDimension.y, props.blockDimension.z)),
        thickness: TSL.uniform(props.borderThickness),
        borderColor: TSL.uniform(new Color(props.borderColor))
    }), []);

    useEffect(() => {
        uniforms.dimension.value.set(props.blockDimension.x, props.blockDimension.y, props.blockDimension.z);
        uniforms.thickness.value = props.borderThickness;
        uniforms.borderColor.value.set(props.borderColor);
    }, [
        props.blockDimension.x,
        props.blockDimension.y,
        props.blockDimension.z,
        props.borderThickness,
        props.borderColor,
        uniforms
    ]);

    return useMemo(() => {
        const absolutePosition = TSL.abs(TSL.positionLocal);
        const boxDimension = TSL.mul(uniforms.dimension, 0.5);

        const distanceToBorder = TSL.sub(boxDimension, absolutePosition);

        const isEdgeX = TSL.step(distanceToBorder.x, uniforms.thickness);
        const isEdgeY = TSL.step(distanceToBorder.y, uniforms.thickness);
        const isEdgeZ = TSL.step(distanceToBorder.z, uniforms.thickness);
        const edgeCount = TSL.add(isEdgeX, isEdgeY, isEdgeZ);

        const isBorder = TSL.step(2.0, edgeCount);

        return TSL.mix(
            props.innerColor,
            uniforms.borderColor,
            isBorder
        );
    }, [uniforms, props.innerColor]);
}