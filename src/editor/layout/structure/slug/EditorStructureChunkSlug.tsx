import {StructureModel} from "../../../../data/model/structure/StructureModel";
import {StarIcon} from "@heroicons/react/24/outline";
import {EditorStructureBaseSlug} from "./EditorStructureBaseSlug";

export type EditorStructureChunkSlugProps = {
    structure: StructureModel,
    isStart: boolean,
}

export function EditorStructureChunkSlug(props: EditorStructureChunkSlugProps) {
    return (
        <>
            {props.isStart && <StarIcon className="w-4"/>}
            <EditorStructureBaseSlug structure={props.structure}/>
        </>
    );
}
