import {EditorStructureItem} from "./EditorStructureItem";
import {ReactSortable} from "react-sortablejs";
import {StructureID, StructureModel} from "../../../../data/model/structure/StructureModel";
import {EditorReducerActions} from "../../../reducer/editorReducer";
import {StructureTypes} from "../../../../data/model/structure/StructureTypes";
import {SectionModel} from "../../../../data/model/structure/system/SectionModel";

export type EditorStructureListProps = {
    structures: {[key: StructureID]: StructureModel},
    parent: StructureID | null,
    selected: StructureID | null,
    start: StructureID | null,
    dispatcher: React.Dispatch<EditorReducerActions>,
}

export function EditorStructureList(props: EditorStructureListProps) {
    const sectionStructures = Object.values(props.structures).filter(structure => structure.parent === props.parent);

    const selectChunk = (id: StructureID) => {
        props.dispatcher({
            type: 'editor_select_structure',
            payload: id,
        });
    }

    const reorderStructures = (newSectionStructures: StructureModel[]) => {
        // section change is only handled by the corresponding section structure (two events on moving between groups)
        if (newSectionStructures.length < sectionStructures.length) {
            return;
        }

        // update the parent of the moved structures
        const movedStructures = newSectionStructures.filter(structure => !sectionStructures.some(e => e.id === structure.id));
        movedStructures.forEach((structure) => {
            props.dispatcher({
                type: 'level_patch_structure',
                payload: {
                    id: structure.id,
                    parent: props.parent,
                }
            })
        })

        // recursively calculate the new total order of elements (we have to remove the old one)
        const calculateSectionOrder = (parent: StructureID|null): StructureID[] => {
            const sectionElements = props.parent === parent
                ? newSectionStructures
                : Object.values(props.structures)
                    .filter(structure => structure.parent === parent)
                    .filter(structure => !movedStructures.map(structure => structure.id).includes(structure.id))
            ;

            const newSectionOrder: StructureID[] = [];
            sectionElements.forEach((structure) => {
                newSectionOrder.push(structure.id);

                if (structure.type === StructureTypes.Section) {
                    const childrenOrder = calculateSectionOrder(structure.id);
                    newSectionOrder.push(...childrenOrder);
                }
            })

            return newSectionOrder;
        }

        // apply the new order
        const newTotalOrder: StructureID[] = calculateSectionOrder(null);
        props.dispatcher({
            type: 'level_reorder_structures',
            payload: newTotalOrder,
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
                    onSelect={() => selectChunk(structure.id)}
                    onCollapseToggle={() => toggleCollapse(structure)}
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
