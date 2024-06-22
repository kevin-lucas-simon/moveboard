import {useContext, useEffect, useState} from "react";
import {DeviceMotionContext, DeviceOrientationContext} from "../UserControls";
import {Quaternion, Vector3} from "three";

export function ChunkLights() {
    // TODO add deviceRotation as user input
    const deviceMotion = useContext(DeviceMotionContext) // TODO rename to UserMotionContext
    const deviceOrientation = useContext(DeviceOrientationContext) // TODO rename to UserOrientationContext

    const [shadowCasterPosition, setShadowCasterPosition] = useState(new Vector3(0, 10, 0))

    // TODO integrate dynamic positions for static lights
    const activeChunk = null
    const chunkPosition = null
    const chunkDimensions = null

    // TODO integrate dynamic positions for dynamic lights via DeviceRotation (look at chunkPosition + deviceRotation sphere)

    // TODO add interpolation while changing chunk

    // calculate shadow caster position
    useEffect(() => {
        const vector = new Vector3(0, 10, 0)
        const rotation = new Quaternion().setFromEuler(deviceOrientation)

        rotation.invert()
        vector.applyQuaternion(rotation)

        setShadowCasterPosition(vector)
    }, [deviceOrientation])

    return (
        <>
            {/* static lights */}
            <ambientLight intensity={Math.PI / 8}/>
            <directionalLight position={[10, 10, 10]} intensity={Math.PI / 2}/>
            <directionalLight position={[10, -10, -10]} intensity={Math.PI / 4}/>
            <directionalLight position={[-10, -10, -10]} intensity={Math.PI / 8}/>
            {/* dynamic lights */}
            <directionalLight
                intensity={Math.PI}
                position={shadowCasterPosition.toArray()}
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
