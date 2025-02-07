import {Physics} from "@react-three/rapier";
import {Canvas} from "@react-three/fiber";
import {GizmoHelper, GizmoViewport, Stats} from "@react-three/drei";
import {useDebugSettings} from "./DebugSettingsProvider";
import {useUserGravityInput} from "./useUserGravityInput";

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
    const debug = useDebugSettings()
    const gravityVector = useUserGravityInput();

    return (
        <Canvas
            resize={{ debounce: 0 }} className={props.className}>
            <ambientLight intensity={Math.PI / 2} />
            <pointLight position={[10, 10, 10]} decay={0} intensity={Math.PI/2} />
            <pointLight position={[10, -10, -10]} decay={0} intensity={Math.PI/4} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI/4} />

            <Physics
                gravity={[gravityVector.x, gravityVector.y, gravityVector.z]}
                paused={debug.pauseSimulation}
            >
                {props.children}
            </Physics>

            {debug.displayEditorFeatures &&
                <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                    <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white" />
                </GizmoHelper>
            }
            {/*{debug.displayPerformanceStats &&*/}
                <Stats />
            {/*}*/}
        </Canvas>
    )
}
