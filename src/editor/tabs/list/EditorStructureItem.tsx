import {StarIcon} from "@heroicons/react/24/outline";
import {StructureModel} from "../../../data/model/structure/StructureModel";

export type EditorStructureItemProps = {
    structure: StructureModel;
    isActive: boolean;
    isStart: boolean;
    onSelect: () => void;
}

export function EditorStructureItem(props: EditorStructureItemProps) {
    return (
        <li className={props.isActive ? "bg-gray-500/10 "  : ""}>
            <div
                onClick={props.onSelect}
                className="flex group hover:bg-gray-500/10 px-4 py-1.5 items-center"
            >
                <div className="grow flex gap-2">
                    {props.isStart && <StarIcon className="w-4"/>}
                    <button>{props.structure.name}</button>
                </div>
            </div>
        </li>
    );
}
