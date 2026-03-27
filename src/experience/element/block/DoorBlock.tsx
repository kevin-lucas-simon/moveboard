import {useChunkReactor} from "../../reducer/ChunkStateProvider";
import {BasicBlock} from "./BasicBlock";
import {DoorBlockModel} from "../../../data/model/element/block/DoorBlockModel";

// TODO beschissener Name, aber fürs erste ok
export function DoorBlock(props: DoorBlockModel) {
    const active = useChunkReactor();

    if (active) {
        return <></>
    }

    return (
        <BasicBlock {...props} color={"secondary"} />
    );
}
