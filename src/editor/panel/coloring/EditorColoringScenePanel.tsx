import {useEditorActiveStructure, useEditorDispatcher} from "../../reducer/EditorProvider";
import {ColoringModel} from "../../../data/model/structure/material/ColoringModel";
import {StructureTypes} from "../../../data/model/structure/StructureTypes";
import {ColorPicker, ColorService, IColor} from "react-color-palette";
import {ColorType, ColorTypes} from "../../../data/model/Color";
import "react-color-palette/css";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {useState} from "react";

export function EditorColoringScenePanel() {
    const [selectedColor, setSelectedColor] = useState<ColorType|null>(null);

    const dispatcher = useEditorDispatcher();
    const structure = useEditorActiveStructure<ColoringModel>(StructureTypes.Coloring);
    if (!structure || !dispatcher) {
        return <></>;
    }

    const selectedColoringEditor = (colorType: ColorType) => {
        setSelectedColor(colorType === selectedColor ? null : colorType);
    }

    const setColoringValue = (colorType: ColorType, colorValue: IColor) => {
        dispatcher({
            type: "level_patch_structure",
            payload: {
                id: structure.id,
                [colorType]: ColorService.toHex(colorValue.hex),
            } as Partial<ColoringModel>,
        })
    }

    return (
        <div className="h-full flex">
            {Object.values(ColorTypes).map((colorType) =>
                <div
                    key={colorType}
                    onClick={() => selectedColoringEditor(colorType)}
                    className="w-full px-8 p-6 flex items-center justify-center group"
                    style={{background: structure[colorType as keyof ColoringModel] ?? "transparent"}}
                >
                    {colorType !== selectedColor && (
                        <PencilSquareIcon
                            className="w-12 h-12 text-white/75 group-hover:text-white"
                            style={{filter: "drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.75))"}}
                        />
                    )}
                    {colorType === selectedColor && (
                        <div onClick={(e) => e.stopPropagation()}>
                            <ColorPicker
                                color={ColorService.convert("hex", structure[colorType])}
                                onChange={(colorValue) => setColoringValue(colorType, colorValue)}
                                hideAlpha={true}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
