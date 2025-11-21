import {Canvas} from "@react-three/fiber";
import {GizmoHelper, GizmoViewport, Stats} from "@react-three/drei";
import {useDebugSettings} from "./debug/settings/DebugSettingsProvider";
import React from "react";
import {EnvironmentPhysics} from "./world/physic/EnvironmentPhysics";
import {EffectComposer, Outline, Selection} from "@react-three/postprocessing";

export type EnvironmentProps = {
    children?: React.ReactNode | undefined,
}

/**
 * Main game experience component to wrap the game and physics engine
 * @param props
 * @constructor
 */
export function Environment(props: EnvironmentProps) {
    const debug = useDebugSettings();

    return (
        <Canvas resize={{ debounce: 0 }}>
            <ambientLight intensity={Math.PI / 2} />
            <pointLight position={[10, 10, 10]} decay={0} intensity={Math.PI/2} />
            <pointLight position={[10, -10, -10]} decay={0} intensity={Math.PI/4} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI/4} />

            <Selection>
                <EnvironmentPhysics>
                    {props.children}
                </EnvironmentPhysics>

                {debug?.displayEditorFeatures &&
                    <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                        <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white" />
                    </GizmoHelper>
                }
                {debug?.displayPerformanceStats &&
                    <Stats />
                }
                <EffectComposer autoClear={false}>
                    <Outline
                        edgeStrength={10000}
                        visibleEdgeColor={0xff0000}
                        hiddenEdgeColor={0xff0000}
                    />
                </EffectComposer>
            </Selection>
        </Canvas>
    )
}