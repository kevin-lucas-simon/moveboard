import {ChunkID, ChunkModel} from "../../../data/model/world/ChunkModel";
import {LevelReducerActions} from "../../reducer/levelReducer";
import {EditorChunkItem} from "./EditorChunkItem";
import {ReactSortable} from "react-sortablejs";

export type EditorChunkListProps = {
    chunks: {[key: ChunkID]: ChunkModel},
    active: ChunkID,
    start: ChunkID,
    dispatcher: React.Dispatch<LevelReducerActions>
}

export function EditorChunkList(props: EditorChunkListProps) {
    const chunks = Object.values(props.chunks);

    const selectChunk = (id: ChunkID) => {
        props.dispatcher({
            type: 'level_select_chunk',
            payload: id,
        });
    }

    const reorderChunks = (newChunks: ChunkModel[]) => {
        const newChunkOrder: ChunkID[] = [];
        newChunks.forEach((chunk) => {
            newChunkOrder.push(chunk.id);
        });

        props.dispatcher({
            type: 'level_reorder_chunks',
            payload: newChunkOrder,
        });
    }

    return (
        <ReactSortable
            list={structuredClone(chunks)}
            setList={reorderChunks}
            tag="ul"
            group={EditorChunkList.name}
        >
            {chunks.map((chunk) => (
                <EditorChunkItem
                    key={chunk.id}
                    chunk={chunk}
                    isActive={chunk.id === props.active}
                    isStart={chunk.id === props.start}
                    onSelect={() => selectChunk(chunk.id)}
                />
            ))}
        </ReactSortable>
    );
}
