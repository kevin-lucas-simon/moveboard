import {EditorStructureItem} from "./EditorStructureItem";
import {ReactSortable} from "react-sortablejs";
import {StructureID, StructureModel} from "../../../../data/model/structure/StructureModel";
import {EditorReducerActions} from "../../../reducer/editorReducer";
import {StructureTypes} from "../../../../data/model/structure/StructureTypes";
import {SectionModel} from "../../../../data/model/structure/system/SectionModel";
import {SortableListService} from "../../../reducer/util/SortableListService";

export type EditorStructureListProps = {
    structures: {[key: StructureID]: StructureModel},
    parent: StructureID | null,
    selected: StructureID | null,
    start: StructureID | null,
    dispatcher: React.Dispatch<EditorReducerActions>,
}

export function EditorStructureList(props: EditorStructureListProps) {
    const sectionStructures = Object.values(props.structures).filter(structure => structure.parent === props.parent);

    const selectStructure = (id: StructureID) => {
        props.dispatcher({
            type: 'editor_select_structure',
            payload: id,
        });
    }

    const renameStructure = (id: StructureID, name: string) => {
        props.dispatcher({
            type: 'level_patch_structure',
            payload: {
                id: id,
                name: name,
            }
        })
    }

    const reorderStructures = (newSectionStructures: StructureModel[]) => {
        if (!SortableListService.hasItemsBeenMoved(sectionStructures, newSectionStructures)) {
            return;
        }

        props.dispatcher({
            type: 'level_reorder_structures',
            payload: {
                parentId: props.parent,
                childIds: newSectionStructures.map(structure => structure.id),
            },
        })
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
            list={structuredClone(sectionStructures)}
            setList={reorderStructures}
            tag="ul"
            group={EditorStructureList.name}
        >
            {sectionStructures.map((structure) => (
                <EditorStructureItem
                    key={structure.id}
                    structure={structure}
                    isStart={structure.id === props.start}
                    isSelected={props.selected === structure.id}
                    onSelect={() => selectStructure(structure.id)}
                    onCollapseToggle={() => toggleCollapse(structure)}
                    onRename={renameStructure}
                >
                    {structure.type === StructureTypes.Section && (
                        <EditorStructureList
                            structures={props.structures}
                            parent={structure.id}
                            start={props.start}
                            selected={props.selected}
                            dispatcher={props.dispatcher}
                        />
                    )}
                </EditorStructureItem>
            ))}
        </ReactSortable>
    );
}
