import {StructureModel} from "../../../../../data/model/structure/StructureModel";
import {ChevronRightIcon, StarIcon} from "@heroicons/react/24/outline";
import {EditorStructureSlug} from "./EditorStructureSlug";

export type EditorChunkSlugProps = {
    structure: StructureModel,
    isStart: boolean,
    isActive: boolean,
}

export function EditorChunkSlug(props: EditorChunkSlugProps) {
    return (
        <>
            {props.isActive && <ChevronRightIcon className="w-4"/>}
            {props.isStart && <StarIcon className="w-4"/>}
            <EditorStructureSlug structure={props.structure}/>
        </>
    );
}
