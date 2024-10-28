import {BasicBlock, BasicBlockProps} from "./BasicBlock";
import {useMemo} from "react";
import {useChunkDimensionRegister} from "../hooks/useChunkDimension";
import {useVector3} from "../serializer/toVector3";

/**
 * Block that is guarantied visible in camera chunk view
 * @param props
 * @constructor
 */
export function FloorBlock(props: BasicBlockProps) {
    const position = useVector3(props.position)
    const dimension = useVector3(props.dimension)

    // register block in chunk dimension for camera
    const [minPosition, maxPosition] = useMemo(() => [
        position.clone().sub(dimension.clone().multiplyScalar(0.5)),
        position.clone().add(dimension.clone().multiplyScalar(0.5)),
    ], [position, dimension])
    useChunkDimensionRegister(minPosition, maxPosition)

    return (
        <BasicBlock {...props} />
    )
}
