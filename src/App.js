import './App.css';
import {Canvas} from "@react-three/fiber";
import {UserControls} from "./components/UserControls";
import {ControlledPlane} from "./components/ControlledPlane";
import {FollowCamera} from "./components/FollowCamera";
import {PlayerPhysics} from "./components/PlayerPhysics";

function App() {
    return (
        <UserControls>
            <Canvas camera={{position: [0, 7, 0], fov: 75}}>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

                {/*<FollowCamera target={{ position: { x: 0, y: 0, z: 0 } }} distance={5}/>*/}

                <PlayerPhysics>
                    <ControlledPlane />
                </PlayerPhysics>
            </Canvas>
        </UserControls>
    );
}

export default App;
