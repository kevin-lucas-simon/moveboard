import {ColorHex, ColorType} from "../../../data/model/Color";
import {useExperienceState} from "../../reducer/ExperienceProvider";
import {StructureTypes} from "../../../data/model/structure/StructureTypes";
import {StructureID} from "../../../data/model/structure/StructureModel";
import {ColoringDefault, ColoringModel} from "../../../data/model/structure/material/ColoringModel";
import {useMemo} from "react";

export function useElementColoring(colorType: ColorType): ColorHex {
    const {level, activeChunkID} = useExperienceState();

    const coloringStructures = useMemo(() => {
        return Object.values(level.structures)
            .filter(structure => structure.type === StructureTypes.Coloring)
    }, [level.structures]);

    const getColoringHex = (parentID: StructureID | null): ColorHex => {
        const coloringStructure = coloringStructures.find(structure => structure.parent === parentID) as ColoringModel;

        if (coloringStructure && coloringStructure[colorType]) {
            return coloringStructure[colorType];
        }

        const parentStructure = parentID ? level.structures[parentID] : null;
        if (parentStructure) {
            return getColoringHex(parentStructure.parent);
        }

        return ColoringDefault[colorType];
    };

    return getColoringHex(activeChunkID);
}