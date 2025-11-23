import {StructureModel} from "../../../../data/model/structure/StructureModel";
import {EditorStructureBaseSlug} from "./EditorStructureBaseSlug";

export type EditorStructureChunkSlugProps = {
    structure: StructureModel,
    onRename: (name: string) => void;
}

export function EditorStructureChunkSlug(props: EditorStructureChunkSlugProps) {
    return (
        <EditorStructureBaseSlug
            structure={props.structure}
            onRename={props.onRename}
        />
    );
}
