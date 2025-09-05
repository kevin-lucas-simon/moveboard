import {LevelReducerActions} from "../../reducer/levelReducer";
import {EditorStructureItem} from "./EditorStructureItem";
import {ReactSortable} from "react-sortablejs";
import {StructureID, StructureModel} from "../../../data/model/structure/StructureModel";

export type EditorStructureListProps = {
    structures: {[key: StructureID]: StructureModel},
    active: StructureID,
    start: StructureID,
    dispatcher: React.Dispatch<LevelReducerActions>
}

export function EditorStructureList(props: EditorStructureListProps) {
    const structureModels = Object.values(props.structures);

    const selectChunk = (id: StructureID) => {
        props.dispatcher({
            type: 'level_select_structure',
            payload: id,
        });
    }

    const reorderStructures = (newStructures: StructureModel[]) => {
        const newStructureOrder: StructureID[] = [];
        newStructures.forEach((chunk) => {
            newStructureOrder.push(chunk.id);
        });

        props.dispatcher({
            type: 'level_reorder_structures',
            payload: newStructureOrder,
        });
    }

    return (
        <ReactSortable
            list={structuredClone(structureModels)}
            setList={reorderStructures}
            tag="ul"
            group={EditorStructureList.name}
        >
            {structureModels.map((structure) => (
                <EditorStructureItem
                    key={structure.id}
                    structure={structure}
                    isActive={structure.id === props.active}
                    isStart={structure.id === props.start}
                    onSelect={() => selectChunk(structure.id)}
                />
            ))}
        </ReactSortable>
    );
}
