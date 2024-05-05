import './App.css';
import {Canvas} from "@react-three/fiber";
import {UserControls} from "./components/UserControls";
import {ControlledPlane} from "./components/ControlledPlane";
import {PlayerPhysics} from "./components/PlayerPhysics";
import {GizmoHelper, GizmoViewport, Grid, KeyboardControls, OrbitControls} from "@react-three/drei";
import {useMemo} from "react";
import {TestLevel} from "./data/TestLevel/TestLevel";

const Controls = {
    top: 'top',
    bottom: 'bottom',
    left: 'left',
    right: 'right',
    jump: 'jump',
}

function App() {
    const keyboardControls = useMemo(()=>[
        { name: Controls.top, keys: ['ArrowUp'] },
        { name: Controls.bottom, keys: ['ArrowDown'] },
        { name: Controls.left, keys: ['ArrowLeft'] },
        { name: Controls.right, keys: ['ArrowRight'] },
        { name: Controls.jump, keys: ['Space'] },
    ], [])

    return (
        <UserControls>
            <Canvas camera={{position: [0, 8, 0], fov: 75}}>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[10, -10, -10]} decay={0} intensity={Math.PI/4} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI/4} />

                {/*<FollowCamera target={{ position: { x: 0, y: 0, z: 0 } }} distance={5}/>*/}

                <KeyboardControls map={keyboardControls}>
                    <PlayerPhysics>
                        {/*<ControlledPlane />*/}
                        <TestLevel />
                    </PlayerPhysics>
                </KeyboardControls>

                <OrbitControls />
                <Grid infiniteGrid={true}/>
                <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                    <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white" />
                </GizmoHelper>
            </Canvas>
        </UserControls>
    );
}

export default App;
