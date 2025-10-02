import {StructureModel} from "../../../../data/model/structure/StructureModel";
import {BaseSlug} from "../../../component/BaseSlug";

export type EditorStructureBaseSlugProps = {
    structure: StructureModel,
    onRename: (name: string) => void;
}

export function EditorStructureBaseSlug(props: EditorStructureBaseSlugProps) {
    return (
        <BaseSlug
            value={props.structure.name}
            placeholder={props.structure.type}
            onRename={props.onRename}
        />
    );
}
