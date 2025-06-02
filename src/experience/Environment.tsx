import {Canvas} from "@react-three/fiber";
import {GizmoHelper, GizmoViewport, Stats} from "@react-three/drei";
import {useDebugSettings} from "./input/DebugSettingsProvider";
import {KeyboardKeysProvider} from "./input/KeyboardKeysProvider";
import {DeviceMotionProvider} from "./input/DeviceMotionProvider";
import React from "react";
import {EnvironmentPhysics} from "./world/physic/EnvironmentPhysics";

export type EnvironmentProps = {
    isGranted: boolean,
    children?: React.ReactNode | undefined,
    className?: string,
}

/**
 * Main game experience component to wrap the game and physics engine
 * @param props
 * @constructor
 */
export function Environment(props: EnvironmentProps) {
    const debug = useDebugSettings();

    return (
        <DeviceMotionProvider isGranted={props.isGranted}>
            <KeyboardKeysProvider>
                <Canvas resize={{ debounce: 0 }} className={props.className}>
                    <ambientLight intensity={Math.PI / 2} />
                    <pointLight position={[10, 10, 10]} decay={0} intensity={Math.PI/2} />
                    <pointLight position={[10, -10, -10]} decay={0} intensity={Math.PI/4} />
                    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI/4} />

                    <EnvironmentPhysics>
                        {props.children}
                    </EnvironmentPhysics>

                    {debug.displayEditorFeatures &&
                        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                            <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white" />
                        </GizmoHelper>
                    }
                    {debug.displayPerformanceStats &&
                        <Stats />
                    }
                </Canvas>
            </KeyboardKeysProvider>
        </DeviceMotionProvider>
    )
}