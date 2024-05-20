import {Chunk} from "../../../components/chunks/Chunk";
import {FirstChunk} from "./FirstChunk";
import {Vector3} from "three";
import {FloorBlock} from "../../../components/blocks/FloorBlock";

export function MultiChunk() {
    return (
        <>
            <Chunk name={"Multi0"} joints={[
                {
                    neighbour: FirstChunk.name,
                    position: new Vector3(-3, 1.5, 0),
                    dimension: new Vector3(1,2,2),
                },
                {
                    neighbour: "Multi1",
                    position: new Vector3(2.5, 1, 0),
                    dimension: new Vector3(1,1,1),
                }
            ]}>
                <FloorBlock
                    position={new Vector3()}
                    dimension={new Vector3(5, 1, 5)}
                    color={"orange"}
                />
            </Chunk>
            <Chunk name={"Multi1"} joints={[
                {
                    neighbour: "Multi0",
                    position: new Vector3(-2.5, 1, 0),
                    dimension: new Vector3(1,1,1),
                },
                {
                    neighbour: "Multi2",
                    position: new Vector3(2.5, 1, 0),
                    dimension: new Vector3(1,1,1),
                }
            ]}>
                <FloorBlock
                    position={new Vector3()}
                    dimension={new Vector3(5, 1, 5)}
                    color={"orange"}
                />
            </Chunk>
            <Chunk name={"Multi2"} joints={[
                {
                    neighbour: "Multi1",
                    position: new Vector3(-2.5, 1, 0),
                    dimension: new Vector3(1,1,1),
                },
            ]}>
                <FloorBlock
                    position={new Vector3()}
                    dimension={new Vector3(5, 1, 5)}
                    color={"orange"}
                />
            </Chunk>
        </>
    );
}
