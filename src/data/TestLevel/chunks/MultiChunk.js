import {Chunk} from "../../../components/chunks/Chunk";
import {BasicBlock} from "../../../components/blocks/BasicBlock";
import {Vector3} from "three";
import {FirstChunk} from "./FirstChunk";

export function MultiChunk() {
    return (
        <>
            <Chunk name={"Multi0"} joints={[
                {
                    neighbour: FirstChunk.name,
                    position: new Vector3(-2.5, 1, 0),
                },
                {
                    neighbour: "Multi1",
                    position: new Vector3(2.5, 1, 0),
                }
            ]}>
                <BasicBlock
                    position={new Vector3()}
                    dimension={new Vector3(5, 1, 5)}
                    color={"orange"}
                />
            </Chunk>
            <Chunk name={"Multi1"} joints={[
                {
                    neighbour: "Multi0",
                    position: new Vector3(-2.5, 1, 0),
                },
                {
                    neighbour: "Multi2",
                    position: new Vector3(2.5, 1, 0),
                }
            ]}>
                <BasicBlock
                    position={new Vector3()}
                    dimension={new Vector3(5, 1, 5)}
                    color={"orange"}
                />
            </Chunk>
            <Chunk name={"Multi2"} joints={[
                {
                    neighbour: "Multi1",
                    position: new Vector3(-2.5, 1, 0),
                },
            ]}>
                <BasicBlock
                    position={new Vector3()}
                    dimension={new Vector3(5, 1, 5)}
                    color={"orange"}
                />
            </Chunk>
        </>
    )
}
