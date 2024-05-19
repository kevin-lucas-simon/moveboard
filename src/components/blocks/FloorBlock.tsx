import {BasicBlock, BasicBlockProps} from "./BasicBlock";
import {useMemo} from "react";
import {useChunkDimensionRegister} from "../hooks/useChunkDimension";

/**
 * Block that is guarantied in cameras view
 * @param props
 * @constructor
 */
export function FloorBlock(props: BasicBlockProps) {
    // register block in chunk dimension for camera
    const [minPosition, maxPosition] = useMemo(() => [
        props.position.clone().sub(props.dimension.clone().multiplyScalar(0.5)),
        props.position.clone().add(props.dimension.clone().multiplyScalar(0.5)),
    ], [props.position, props.dimension])
    useChunkDimensionRegister(minPosition, maxPosition)

    return (
        <BasicBlock {...props} />
    )
}
