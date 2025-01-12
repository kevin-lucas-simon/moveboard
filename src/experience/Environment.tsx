import {useContext} from "react";
import {DeviceMotionContext} from "./UserControls";
import {Physics} from "@react-three/rapier";
import {Canvas} from "@react-three/fiber";
import {GizmoHelper, GizmoViewport, Stats} from "@react-three/drei";
import {useDebugSettings} from "./DebugSettingsProvider";

export type EnvironmentProps = {
    children?: React.ReactNode | undefined,
    className?: string,
}

/**
 * Main game experience component to wrap the game and physics engine
 * @param props
 * @constructor
 */
export function Environment(props: EnvironmentProps) {
    const deviceMotion = useContext(DeviceMotionContext)
    const debug = useDebugSettings()

    return (
        <Canvas resize={{ debounce: 0 }} className={props.className}>
            <ambientLight intensity={Math.PI / 2} />
            <pointLight position={[10, 10, 10]} decay={0} intensity={Math.PI/2} />
            <pointLight position={[10, -10, -10]} decay={0} intensity={Math.PI/4} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI/4} />

            <Physics gravity={[deviceMotion.x, deviceMotion.y, deviceMotion.z]}>
                {props.children}
            </Physics>

            {/* debug tools */}
            {debug.displayGizmo &&
                <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                    <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white" />
                </GizmoHelper>
            }
            {debug.displayStats &&
                <Stats />
            }
        </Canvas>
    )
}
