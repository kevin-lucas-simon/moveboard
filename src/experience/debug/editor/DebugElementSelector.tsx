import {PivotControls} from "@react-three/drei";
import {
    useEditorDispatcher,
    useEditorContext,
    useEditorSelectedChunkElements
} from "../../../editor/reducer/EditorProvider";
import {Euler, Matrix4, Vector3, Vector3Like} from "three";
import React, {useState} from "react";
import {ElementModel} from "../../../data/model/element/ElementModel";
import {Select} from "@react-three/postprocessing";
import {Element} from "../../world/Element";
import {isElementDimensionable} from "../../../data/model/element/marker/ElementDimensionable";
import {useSimulationSettings} from "../settings/SimulationSettingsProvider";
import {Angle} from "../../../data/model/Angle";
import {isElementRotatable} from "../../../data/model/element/marker/ElementRotatable";

export type DebugElementSelectorProps = {
    activeChunkWorldPosition: Vector3Like;
}

export function DebugElementSelector(props: DebugElementSelectorProps) {
    const editor = useEditorContext();
    const dispatcher = useEditorDispatcher();

    const [pivotResetCounter, setPivotResetCounter] = useState<number>(0);
    const pivotRef = React.useRef<any>(null);

    const selectedElements = Object
        .values(useEditorSelectedChunkElements())
        .filter((element: ElementModel) => !element.hidden);

    const enableEditing = useSimulationSettings()?.isEditingMode;

    if (!editor || !dispatcher || selectedElements.length === 0 || !enableEditing) {
        return <></>
    }

    const enableRotation = selectedElements.length === 1 && isElementRotatable(selectedElements[0]);
    const enableScaling = selectedElements.length === 1 && isElementDimensionable(selectedElements[0]);

    // pivot position is on average of all selected elements
    const pivotPosition = new Vector3().copy(props.activeChunkWorldPosition);
    selectedElements.forEach(element => {
        pivotPosition.add(new Vector3().copy(element.position));
    });
    pivotPosition.divideScalar(selectedElements.length);

    // pivot rotation is only for first selected element
    const pivotRotation = new Euler();
    if (enableRotation && isElementRotatable(selectedElements[0])) {
        const elementRotation = new Angle().copy(selectedElements[0].rotation).toEuler();
        pivotRotation.copy(elementRotation);
    }

    const handleDragEnd = () => {
        setPivotResetCounter(c => c + 1);

        const pivotMatrix = pivotRef.current?.matrix as Matrix4;
        if (!pivotMatrix) {
            console.warn("Pivot matrix not found: " + pivotRef.current);
            return;
        }

        const pivotDimension = new Vector3().setFromMatrixScale(pivotMatrix);
        if (!pivotDimension.equals(new Vector3(1, 1, 1))) {
            selectedElements.forEach(element => {
                if (!isElementDimensionable(element)) {
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
            selectedElements.forEach(element => {
                dispatcher({
                    type: 'chunk_patch_element',
                    payload: {
                        id: element.id,
                        position: new Vector3()
                            .copy(element.position)
                            .add(pivotPosition.round()),
                    },
                });

            });
            return;
        }
    };

    return (
        <PivotControls
            key={pivotResetCounter}
            ref={pivotRef}
            offset={pivotPosition.toArray()}
            rotation={[pivotRotation.x, pivotRotation.y, pivotRotation.z]}
            disableRotations={true}
            disableScaling={!enableScaling}
            disableSliders={true}
            depthTest={false}
            lineWidth={2}
            scale={2}
            opacity={0.75}
            onDragEnd={handleDragEnd}
        >
            {selectedElements.map(element =>
                <Select enabled={true} key={element.id}>
                    <Element {...element} key={element.id} />
                </Select>
            )}
        </PivotControls>
    );
}
