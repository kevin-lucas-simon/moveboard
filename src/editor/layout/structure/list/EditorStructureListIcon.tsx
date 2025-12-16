import {StructureModel} from "../../../../data/model/structure/StructureModel";
import {StructureTypes} from "../../../../data/model/structure/StructureTypes";
import {MinusIcon, QuestionMarkCircleIcon, SwatchIcon} from "@heroicons/react/24/outline";
import React from "react";

export function EditorStructureListIcon(structure: StructureModel) {
    switch (structure.type) {
        case StructureTypes.Chunk:
            return <MinusIcon className="w-4"/>;
        case StructureTypes.Coloring:
            return <SwatchIcon className="w-4"/>;
        case StructureTypes.Section:
            return <></>;
        default:
            return <QuestionMarkCircleIcon className="w-4"/>;
    }
}