import {BasicBlock, BasicBlockProps} from "../../../components/blocks/BasicBlock";
import {Vector3} from "three";

export type WallStructureProps = BasicBlockProps & {
    holeDimension: Vector3,
}

export function WallWithHoleStructure(props: WallStructureProps) {
    const position = props.position;
    const dimension = props.dimension;
    const holeDimension = props.holeDimension;

    let wallBlocks = []

    // foreach from -1 to 1 to simulate x,y,z directions
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z++) {
                // skip hole
                if (x === 0 && y === 0 && z === 0) {
                    continue;
                }

                // calculate possible position
                const possiblePosition = new Vector3(
                    position.x + x * ((dimension.x - holeDimension.x) / 4) + x * (holeDimension.x / 2),
                    position.y + y * ((dimension.y - holeDimension.y) / 4) + y * (holeDimension.y / 2),
                    position.z + z * ((dimension.z - holeDimension.z) / 4) + z * (holeDimension.z / 2),
                )

                // skip positions outside the wall
                if (possiblePosition.x >= position.x + dimension.x / 2
                    || possiblePosition.x <= position.x - dimension.x / 2
                    || possiblePosition.y >= position.y + dimension.y / 2
                    || possiblePosition.y <= position.y - dimension.y / 2
                    || possiblePosition.z >= position.z + dimension.z / 2
                    || possiblePosition.z <= position.z - dimension.z / 2
                ) {
                    continue;
                }

                // calculate dimension
                const possibleDimension = new Vector3(
                    x === 0 ? Math.min(holeDimension.x, dimension.x) : (dimension.x - holeDimension.x) / 2,
                    y === 0 ? Math.min(holeDimension.y, dimension.y) : (dimension.y - holeDimension.y) / 2,
                    z === 0 ? Math.min(holeDimension.z, dimension.z) : (dimension.z - holeDimension.z) / 2,
                )

                wallBlocks.push({
                    position: possiblePosition,
                    dimension: possibleDimension,
                });
            }
        }
    }

    console.log(wallBlocks);

    return (
        <>
            {wallBlocks.map((block, index) =>
                <BasicBlock {...props} key={index} position={block.position} dimension={block.dimension} />
            )}
        </>
    )
}
