import {StructureModel} from "../../../../data/model/structure/StructureModel";

export type EditorStructureBaseSlugProps = {
    structure: StructureModel,
}

export function EditorStructureBaseSlug(props: EditorStructureBaseSlugProps) {
    return (
        <button className="w-0 grow truncate text-left">
            {props.structure.name ? props.structure.name : props.structure.type}
        </button>
    );
}
