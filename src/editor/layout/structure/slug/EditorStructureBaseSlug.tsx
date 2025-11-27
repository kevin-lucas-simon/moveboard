import {StructureModel} from "../../../../data/model/structure/StructureModel";
import {BaseSlug} from "../../../component/BaseSlug";
import {StructureTypes} from "../../../../data/model/structure/StructureTypes";
import {MinusIcon, SwatchIcon} from "@heroicons/react/24/outline";

export type EditorStructureBaseSlugProps = {
    structure: StructureModel,
    onRename: (name: string) => void;
}

export function EditorStructureBaseSlug(props: EditorStructureBaseSlugProps) {
    return (
        <>
            {(() => {
                switch (props.structure.type) {
                    case StructureTypes.Chunk:
                        return <MinusIcon  className="w-4" />;
                    case StructureTypes.Coloring:
                        return <SwatchIcon className="w-4" />;
                    default:
                        return <></>;
                }
            })()}
            <BaseSlug
                value={props.structure.name}
                placeholder={props.structure.type}
                onRename={props.onRename}
            />
        </>

    );
}
