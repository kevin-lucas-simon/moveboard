import {Canvas} from "@react-three/fiber";
import {GizmoHelper, GizmoViewport, KeyboardControls, Stats} from "@react-three/drei";
import {PlayerPhysics} from "./components/PlayerPhysics";
import {TestLevel} from "./data/TestLevel/TestLevel";
import {UserControls} from "./components/UserControls";
import {useMemo} from "react";

const Controls = {
    top: 'top',
    bottom: 'bottom',
    left: 'left',
    right: 'right',
    jump: 'jump',
}

export function App() {
    const keyboardControls = useMemo(()=>[
        { name: Controls.top, keys: ['ArrowUp'] },
        { name: Controls.bottom, keys: ['ArrowDown'] },
        { name: Controls.left, keys: ['ArrowLeft'] },
        { name: Controls.right, keys: ['ArrowRight'] },
        { name: Controls.jump, keys: ['Space'] },
    ], [])

    return (
        <UserControls>
            <Canvas>
                <ambientLight intensity={Math.PI / 2} />
                <pointLight position={[10, 10, 10]} decay={0} intensity={Math.PI/2} />
                <pointLight position={[10, -10, -10]} decay={0} intensity={Math.PI/4} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI/4} />

                <KeyboardControls map={keyboardControls}>
                    {/* TODO debug Provider einrichten! -> Key based, mit LocalStorage */}
                    <PlayerPhysics>
                        <TestLevel />
                    </PlayerPhysics>
                </KeyboardControls>

                {/*<Grid infiniteGrid={true}/>*/}
                <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                    <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white" />
                </GizmoHelper>

                <Stats />
            </Canvas>
        </UserControls>
    );
}
