import {PivotControls} from "@react-three/drei";
import {
    useEditorActions,
    useEditorContext,
    useEditorSelectedChunkElements
} from "../../editor/reducer/EditorProvider";
import {Matrix4, Vector3, Vector3Like} from "three";
import React from "react";
import {ElementExperienceComponents} from "../element/ElementExperienceComponents";
import {ElementTypes} from "../../data/model/element/ElementTypes";
import {ElementModel} from "../../data/model/element/ElementModel";

const SNAP_INTERVAL = 1.0;

export type EditorChunkElementManipulatorProps = {
    activeChunkWorldPosition: Vector3Like;
}

// TODO der name <EditorChunkElementManipulator> ist ja scheiße
export function EditorChunkElementManipulator(props: EditorChunkElementManipulatorProps) {
    const editor = useEditorContext();
    const dispatcher = useEditorActions();

    const visibleSelectedElements = Object.values(useEditorSelectedChunkElements()).filter((element: ElementModel) => !element.hidden);

    const pivotKeyCounter = React.useRef(0);
    const pivotRef = React.useRef<any>(null);

    if (!editor || !dispatcher || visibleSelectedElements.length === 0) {
        return <></>
    }

    const pivotPosition = new Vector3().copy(props.activeChunkWorldPosition);
    visibleSelectedElements.forEach(element => {
        pivotPosition.add(new Vector3().copy(element.position));
    });
    pivotPosition.divideScalar(visibleSelectedElements.length);

    const handleDragEnd = () => {
        if (!pivotRef.current) {
            return;
        }

        const pivotMatrix = pivotRef.current.matrix as Matrix4;
        if (!pivotMatrix) {
            console.warn("Pivot matrix not found: " + pivotRef.current);
            return;
        }
        const pivotDrag = new Vector3().setFromMatrixPosition(pivotMatrix);

        const snappedDrag = new Vector3(
            Math.round(pivotDrag.x / SNAP_INTERVAL) * SNAP_INTERVAL,
            Math.round(pivotDrag.y / SNAP_INTERVAL) * SNAP_INTERVAL,
            Math.round(pivotDrag.z / SNAP_INTERVAL) * SNAP_INTERVAL,
        );

        visibleSelectedElements.forEach(element => {
            const newPosition = new Vector3()
                .copy(element.position)
                .add(snappedDrag)
            ;
            dispatcher({
                type: 'chunk_patch_element',
                payload: {
                    id: element.id,
                    position: newPosition,
                }
            });
        });
    };

    return (
        <PivotControls
            disableRotations={true}
            disableScaling={true}
            disableSliders={true}
            depthTest={false}
            opacity={0.75}
            lineWidth={2}
            scale={2}
            offset={pivotPosition.toArray()}
            key={pivotKeyCounter.current++} // force re-mount to reset position
            ref={pivotRef}
            onDragEnd={handleDragEnd}
        >
            {visibleSelectedElements.map(element =>
                React.createElement( // TODO das sollte in einer separaten Funktion ausgelagert werden, da es auch in Element.tsx verwendet wird
                    ElementExperienceComponents[element.type]?.experienceComponent ?? ElementExperienceComponents[ElementTypes.Unknown].experienceComponent,
                    {
                        ...element,
                        key: element.id,
                    }
                )
            )}
        </PivotControls>
    );
}
