import './App.css';
import {Canvas} from "@react-three/fiber";
import {UserControls} from "./components/UserControls";
import {ControlledPlane} from "./components/ControlledPlane";
import {PlayerPhysics} from "./components/PlayerPhysics";
import {OrbitControls} from "@react-three/drei";

function App() {
    return (
        <UserControls>
            <Canvas camera={{position: [0, 8, 0], fov: 75}}>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[10, -10, -10]} decay={0} intensity={Math.PI/4} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI/4} />

                {/*<FollowCamera target={{ position: { x: 0, y: 0, z: 0 } }} distance={5}/>*/}
                <OrbitControls />

                <PlayerPhysics>
                    <ControlledPlane />
                </PlayerPhysics>
            </Canvas>
        </UserControls>
    );
}

export default App;
