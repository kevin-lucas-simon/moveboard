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

const SNAP_INTERVAL = 1.0;

export type DebugElementSelectorProps = {
    activeChunkWorldPosition: Vector3Like;
}

export function DebugElementSelector(props: DebugElementSelectorProps) {
    const editor = useEditorContext();
    const dispatcher = useEditorDispatcher();

    const visibleSelectedElements = Object.values(useEditorSelectedChunkElements()).filter((element: ElementModel) => !element.hidden);

    const [pivotResetCounter, setPivotResetCounter] = useState<number>(0);
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

        setPivotResetCounter(c => c + 1);
        if (snappedDrag.length() === 0) {
            return;
        }

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
            key={pivotResetCounter} // force re-mount to reset position
            ref={pivotRef}
            onDragEnd={handleDragEnd}
        >
            {visibleSelectedElements.map(element =>
                <Select enabled={true}>
                    <Element
                        {...element}
                        key={element.id}
                    />
                </Select>
            )}
        </PivotControls>
    );
}
