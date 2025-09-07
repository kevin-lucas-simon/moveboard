import {EditorStructureItem} from "./EditorStructureItem";
import {ReactSortable} from "react-sortablejs";
import {StructureID, StructureModel} from "../../../../data/model/structure/StructureModel";
import {EditorReducerActions} from "../../../reducer/editorReducer";
import {StructureTypes} from "../../../../data/model/structure/StructureTypes";
import {SectionModel} from "../../../../data/model/structure/system/SectionModel";

export type EditorStructureListProps = {
    structures: {[key: StructureID]: StructureModel},
    active: StructureID,
    start: StructureID,
    selected: StructureID[],
    dispatcher: React.Dispatch<EditorReducerActions>,
}

export function EditorStructureList(props: EditorStructureListProps) {
    const structureModels = Object.values(props.structures);

    const selectChunk = (id: StructureID) => {
        props.dispatcher({
            type: 'editor_select_structure',
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

    const toggleCollapse = (structure: StructureModel) => {
        if (structure.type !== StructureTypes.Section) {
            return;
        }

        props.dispatcher({
            type: 'level_patch_structure',
            payload: {
                id: structure.id,
                collapsed: !(structure as SectionModel).collapsed,
            } as SectionModel,
        })
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
                    isSelected={props.selected.includes(structure.id)}
                    onSelect={() => selectChunk(structure.id)}
                    onCollapseToggle={() => toggleCollapse(structure)}
                />
            ))}
        </ReactSortable>
    );
}
