import {Vector3} from "three";
import {createContext, ReactNode, useEffect, useState} from "react";

export const GRAVITATION = 9.81;
export const DeviceMotionContext = createContext(new Vector3(0, -9.81, 0));

export type UserControlsProps = {
    children?: ReactNode|undefined,
}

export function UserControls(props: UserControlsProps) {
    const [combinedInputVector, setCombinedInputVector] = useState(new Vector3(0, -9.81, 0))

    const [deviceMotionVector, setDeviceMotionVector] = useState<Vector3|null>(null)
    const keyboardVector = useKeyboardControls();

    // add all vectors together
    useEffect(() => {
        const newCombinedInputVector = new Vector3(0, -GRAVITATION, 0)

        // apply device sensor input as basis if available
        if (deviceMotionVector) {
            newCombinedInputVector.copy(deviceMotionVector)
        }

        // apply keyboard input
        keyboardVector.multiply(new Vector3(GRAVITATION, 2*GRAVITATION, GRAVITATION))
        newCombinedInputVector.add(keyboardVector)

        console.log(newCombinedInputVector)
        setCombinedInputVector(newCombinedInputVector)
    }, [deviceMotionVector, keyboardVector]);


    return (
        <>
            {/* TODO add permission request */}
            {/*{!deviceMotionVector &&*/}
            {/*    <StartModal onPermissionClick={test} />*/}
            {/*}*/}
            <DeviceMotionContext.Provider value={combinedInputVector}>
                {props.children}
            </DeviceMotionContext.Provider>
        </>
    );
}

// function setPermission(setMotionVector, setUserControlState) {
//     if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
//         DeviceMotionEvent.requestPermission()
//             .then( response => {
//                 if ( response === "granted" ) {
//                     window.addEventListener( "devicemotion", (e) => {
//                         const realScreenSizeToSimulationFactor = 5;
//                         setMotionVector(new Vector3(
//                             e.accelerationIncludingGravity.x * realScreenSizeToSimulationFactor,
//                             e.accelerationIncludingGravity.z * realScreenSizeToSimulationFactor,
//                             -e.accelerationIncludingGravity.y * realScreenSizeToSimulationFactor,
//                         ))
//                         setUserControlState(UserControlState.Game)
//                     })
//                 }
//             })
//             .catch( console.error )
//     }
// }

/**
 * Hook to get the current keyboard input vector
 */
function useKeyboardControls() {
    const [keysDown, setKeysDown]
        = useState(new Set<string>())
    const [keyboardVector, setKeyboardVector]
        = useState(new Vector3(0, 0, 0))

    // add event listeners
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            setKeysDown(keysDown.add(event.key))
            calculateKeyboardVector()
        }
        const handleKeyUp = (event: KeyboardEvent) => {
            keysDown.delete(event.key)
            setKeysDown(new Set(keysDown))
            calculateKeyboardVector()
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    // calculate vector based on keys pressed
    const calculateKeyboardVector = () => {
        const newKeyboardVector = new Vector3(0, 0, 0)

        if (keysDown.has('ArrowUp') || keysDown.has('w')) {
            newKeyboardVector.add(new Vector3(0, 0, -1))
        }
        if (keysDown.has('ArrowDown') || keysDown.has('s')) {
            newKeyboardVector.add(new Vector3(0, 0, 1))
        }
        if (keysDown.has('ArrowLeft') || keysDown.has('a')) {
            newKeyboardVector.add(new Vector3(-1, 0, 0))
        }
        if (keysDown.has('ArrowRight') || keysDown.has('d')) {
            newKeyboardVector.add(new Vector3(1, 0, 0))
        }
        if (keysDown.has(' ')) {
            newKeyboardVector.add(new Vector3(0, 1, 0))
        }

        newKeyboardVector.normalize()
        setKeyboardVector(newKeyboardVector)
    }

    return keyboardVector
}