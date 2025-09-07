import {StructureModel} from "../../../../../data/model/structure/StructureModel";
import {StarIcon} from "@heroicons/react/24/outline";

export type EditorStructureSlugProps = {
    structure: StructureModel,
    isStart?: boolean,
}

export function EditorStructureSlug(props: EditorStructureSlugProps) {
    return (
        <>
            {props.isStart && <StarIcon className="w-4"/>}
            <button className="w-0 grow truncate text-left">
                {props.structure.name ? props.structure.name : props.structure.type}
            </button>
        </>
    );
}
