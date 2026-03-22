import { useEffect, useMemo } from "react";
import { Vector3, Vector3Like, Color } from "three";
import * as TSL from 'three/tsl';

export function BorderBlockMaterial(props: {
    blockDimension: Vector3Like;
    borderThickness: number;
    borderColor: string;
    innerColor: string;
}) {
    const uniforms = useMemo(() => ({
        dimension: TSL.uniform(new Vector3(props.blockDimension.x, props.blockDimension.y, props.blockDimension.z)),
        thickness: TSL.uniform(props.borderThickness),
        innerColor: TSL.uniform(new Color(props.innerColor)),
        borderColor: TSL.uniform(new Color(props.borderColor))
    }), []);

    useEffect(() => {
        uniforms.dimension.value.set(props.blockDimension.x, props.blockDimension.y, props.blockDimension.z);
        uniforms.thickness.value = props.borderThickness;
        uniforms.innerColor.value.set(props.innerColor);
        uniforms.borderColor.value.set(props.borderColor);
    }, [
        props.blockDimension.x,
        props.blockDimension.y,
        props.blockDimension.z,
        props.borderThickness,
        props.innerColor,
        props.borderColor,
        uniforms
    ]);

    const colorNode = useMemo(() => {
        const absolutePosition = TSL.abs(TSL.positionLocal);
        const boxDimension = TSL.mul(uniforms.dimension, 0.5);

        const distanceToBorder = TSL.sub(boxDimension, absolutePosition);

        const isEdgeX = TSL.step(distanceToBorder.x, uniforms.thickness);
        const isEdgeY = TSL.step(distanceToBorder.y, uniforms.thickness);
        const isEdgeZ = TSL.step(distanceToBorder.z, uniforms.thickness);
        const edgeCount = TSL.add(isEdgeX, isEdgeY, isEdgeZ);

        const isBorder = TSL.step(2.0, edgeCount);

        return TSL.mix(
            uniforms.innerColor,
            uniforms.borderColor,
            isBorder
        );
    }, [uniforms]);

    return <meshStandardNodeMaterial colorNode={colorNode} />;
}