import {BasicBlock, BasicBlockProps} from "../../../components/blocks/BasicBlock";
import {Vector3} from "three";

export type WallStructureProps = BasicBlockProps & {
    holeDimension: Vector3,
    holeOffset: Vector3,
}

export function WallWithHoleStructure(props: WallStructureProps) {
    const position = props.position;
    const dimension = props.dimension;
    const holeDimension = props.holeDimension;
    const holeOffset = props.holeOffset;

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
                // (position + hole dimension size + half of the rest dimension space + hole offset)
                const possiblePosition = new Vector3(
                    position.x
                        + x * (holeDimension.x / 2)
                        + x * ((dimension.x - holeDimension.x) / 4)
                        + holeOffset.x - Math.abs(x) * holeOffset.x / 2
                    ,
                    position.y
                        + y * (holeDimension.y / 2)
                        + y * ((dimension.y - holeDimension.y) / 4)
                        + holeOffset.y - Math.abs(y) * holeOffset.y / 2
                    ,
                    position.z
                        + z * (holeDimension.z / 2)
                        + z * ((dimension.z - holeDimension.z) / 4)
                        + holeOffset.z - Math.abs(z) * holeOffset.z / 2
                    ,
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
                    x === 0 ? Math.min(holeDimension.x, dimension.x)
                        : (dimension.x - holeDimension.x) / 2 + Math.abs(holeOffset.x),
                    y === 0 ? Math.min(holeDimension.y, dimension.y)
                        : (dimension.y - holeDimension.y) / 2 + Math.abs(holeOffset.y),
                    z === 0 ? Math.min(holeDimension.z, dimension.z)
                        : (dimension.z - holeDimension.z) / 2 + Math.abs(holeOffset.z),
                )

                wallBlocks.push({
                    position: possiblePosition,
                    dimension: possibleDimension,
                });
            }
        }
    }

    return (
        <>
            {wallBlocks.map((block, index) =>
                <BasicBlock {...props} key={index} position={block.position} dimension={block.dimension} />
            )}
        </>
    )
}
