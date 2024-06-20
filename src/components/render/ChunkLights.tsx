import {useContext} from "react";
import {DeviceMotionContext} from "../UserControls";

export function ChunkLights() {
    // TODO add deviceRotation as user input
    const deviceMotion = useContext(DeviceMotionContext)

    // TODO integrate dynamic positions for static lights
    const activeChunk = null
    const chunkPosition = null
    const chunkDimensions = null

    // TODO integrate dynamic positions for dynamic lights via DeviceRotation (look at chunkPosition + deviceRotation sphere)

    // TODO add interpolation while changing chunk

    return (
        <>
            {/* static lights */}
            <ambientLight intensity={Math.PI / 8}/>
            <pointLight position={[10, 10, 10]} decay={0} intensity={Math.PI / 2}/>
            <pointLight position={[10, -10, -10]} decay={0} intensity={Math.PI / 4}/>
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI / 8}/>
            {/* dynamic lights */}
            <directionalLight
                intensity={Math.PI}
                position={[-deviceMotion.x, 10, -deviceMotion.z]} // TODO integrate full rotation sphere
                // TODO or use the sphere only for the upper half and make some own "realistic lighting?"
                castShadow={true}
                // shadow-bias={-0.0001} // TODO whats that?
                shadow-mapSize-height={2048} // TODO integrate window pixel ratio calculation (guess just use higher value from both)
                shadow-mapSize-width={2048}
                shadow-camera-near={0.1}
                shadow-camera-far={100}
                shadow-camera-width={10}
                shadow-camera-height={10}
                // shadow-camera-left={-10} // TODO maybe it can help us with our range calculation?
                // shadow-camera-right={10}
                // shadow-camera-top={10}
                // shadow-camera-bottom={-10}
            />
        </>
    );
}
