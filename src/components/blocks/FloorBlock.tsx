import {BasicBlock, BasicBlockProps} from "./BasicBlock";
import {useVector3, useWorldPosition} from "../util/toVector3";
import {NewChunkContext} from "../chunks/NewChunk";

/**
 * Block that is guarantied visible in camera chunk view
 * @param props
 * @constructor
 */
export function FloorBlock(props: BasicBlockProps) {
    const position = useWorldPosition(props.position)
    const dimension = useVector3(props.dimension)

    // TODO müsste für die Kamera vlt gefixt werden oder doch über Level Ebene?
    // // register block in chunk dimension for camera
    // const [minPosition, maxPosition] = useMemo(() => [
    //     position.clone().sub(dimension.clone().multiplyScalar(0.5)),
    //     position.clone().add(dimension.clone().multiplyScalar(0.5)),
    // ], [position, dimension])
    // useChunkDimensionRegister(minPosition, maxPosition)

    return (
        <BasicBlock {...props} />
    )
}
