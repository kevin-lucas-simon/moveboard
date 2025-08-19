import {ChunkModel} from "../../../data/model/world/ChunkModel";
import {StarIcon} from "@heroicons/react/24/outline";

export type EditorChunkItemProps = {
    chunk: ChunkModel;
    isActive: boolean;
    isStart: boolean;
    onSelect: () => void;
}

export function EditorChunkItem(props: EditorChunkItemProps) {
    return (
        <li className={props.isActive ? "bg-gray-500/10 "  : ""}>
            <div
                onClick={props.onSelect}
                className="flex group hover:bg-gray-500/10 px-4 py-1.5 items-center"
            >
                <div className="grow flex gap-2">
                    {props.isStart && <StarIcon className="w-4"/>}
                    <button>{props.chunk.name}</button>
                </div>
            </div>
        </li>
    );
}
