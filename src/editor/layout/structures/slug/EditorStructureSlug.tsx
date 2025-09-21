import {StructureModel} from "../../../../data/model/structure/StructureModel";

export type EditorStructureSlugProps = {
    structure: StructureModel,
}

export function EditorStructureSlug(props: EditorStructureSlugProps) {
    return (
        <button className="w-0 grow truncate text-left">
            {props.structure.name ? props.structure.name : props.structure.type}
        </button>
    );
}
