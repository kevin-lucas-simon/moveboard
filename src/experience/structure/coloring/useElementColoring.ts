import {ColorHex, ColorType} from "../../../data/model/Color";
import {useExperienceState} from "../../reducer/ExperienceProvider";
import {StructureTypes} from "../../../data/model/structure/StructureTypes";
import {StructureID} from "../../../data/model/structure/StructureModel";
import {ColoringDefault, ColoringModel} from "../../../data/model/structure/material/ColoringModel";
import {useCallback, useMemo} from "react";

export function useElementColoring(colorType: ColorType): ColorHex {
    const {level, activeChunkID} = useExperienceState();

    const memoizedData = useMemo(() => {
        const coloringStructures = Object.values(level.structures)
            .filter(structure => structure.type === StructureTypes.Coloring);
        
        return {
            structures: level.structures,
            coloringStructures
        };
    }, [level.structures]);

    const getColoringHex = useCallback((parentID: StructureID | null): ColorHex => {
        const coloringStructure = memoizedData.coloringStructures.find(
            structure => structure.parent === parentID
        ) as ColoringModel;

        if (coloringStructure && coloringStructure[colorType]) {
            return coloringStructure[colorType];
        }

        const parentStructure = parentID ? memoizedData.structures[parentID] : null;
        if (parentStructure) {
            return getColoringHex(parentStructure.parent);
        }

        return ColoringDefault[colorType];
    }, [memoizedData, colorType]);

    return useMemo(() => getColoringHex(activeChunkID), [getColoringHex, activeChunkID]);
}