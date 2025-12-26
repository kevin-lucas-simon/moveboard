import {PivotControls} from "@react-three/drei";
import {
    useEditorDispatcher,
    useEditorContext,
    useEditorSelectedChunkElements
} from "../../../editor/reducer/EditorProvider";
import {Matrix4, Vector3, Vector3Like} from "three";
import React, {useState} from "react";
import {ElementModel} from "../../../data/model/element/ElementModel";
import {Select} from "@react-three/postprocessing";
import {Element} from "../../world/Element";
import {isElementResizeable} from "../../../data/model/element/marker/ElementResizeable";
import {useSimulationSettings} from "../settings/SimulationSettingsProvider";

export type DebugElementSelectorProps = {
    activeChunkWorldPosition: Vector3Like;
}

export function DebugElementSelector(props: DebugElementSelectorProps) {
    const editor = useEditorContext();
    const dispatcher = useEditorDispatcher();

    const isEditingMode = useSimulationSettings()?.isEditingMode;
    const visibleSelectedElements = Object.values(useEditorSelectedChunkElements()).filter((element: ElementModel) => !element.hidden);

    const [pivotResetCounter, setPivotResetCounter] = useState<number>(0);
    const pivotRef = React.useRef<any>(null);

    if (!editor || !dispatcher || visibleSelectedElements.length === 0 || !isEditingMode) {
        return <></>
    }

    // pivot is on average position of all selected elements
    const pivotPosition = new Vector3().copy(props.activeChunkWorldPosition);
    visibleSelectedElements.forEach(element => {
        pivotPosition.add(new Vector3().copy(element.position));
    });
    pivotPosition.divideScalar(visibleSelectedElements.length);

    const handleDragEnd = () => {
        setPivotResetCounter(c => c + 1);
        if (!pivotRef.current) {
            return;
        }

        const pivotMatrix = pivotRef.current.matrix as Matrix4;
        if (!pivotMatrix) {
            console.warn("Pivot matrix not found: " + pivotRef.current);
            return;
        }

        const pivotDimension = new Vector3().setFromMatrixScale(pivotMatrix);
        if (!pivotDimension.equals(new Vector3(1, 1, 1))) {
            visibleSelectedElements.forEach(element => {
                if (!isElementResizeable(element)) {
                    return;
                }
                dispatcher({
                    type: 'chunk_patch_element',
                    payload: {
                        id: element.id,
                        dimension: new Vector3()
                            .copy(element.dimension)
                            .multiply(pivotDimension)
                            .round(),
                    } as Partial<ElementModel>,
                });
            });
            return;
        }

        const pivotPosition = new Vector3().setFromMatrixPosition(pivotMatrix);
        if (!pivotPosition.equals(new Vector3(0, 0, 0))) {
            visibleSelectedElements.forEach(element => {
                dispatcher({
                    type: 'chunk_patch_element',
                    payload: {
                        id: element.id,
                        position: new Vector3()
                            .copy(element.position)
                            .add(pivotPosition)
                            .round(),
                    },
                });

            });
            return;
        }
    };

    return (
        <PivotControls
            disableRotations={true}
            disableScaling={visibleSelectedElements.length !== 1 || !isElementResizeable(visibleSelectedElements[0])}
            disableSliders={true}
            depthTest={false}
            opacity={0.75}
            lineWidth={2}
            scale={2}
            offset={pivotPosition.toArray()}
            key={pivotResetCounter} // force re-mount to reset position
            ref={pivotRef}
            onDragEnd={handleDragEnd}
        >
            {visibleSelectedElements.map(element =>
                <Select enabled={true} key={element.id}>
                    <Element
                        {...element}
                        key={element.id}
                    />
                </Select>
            )}
        </PivotControls>
    );
}
