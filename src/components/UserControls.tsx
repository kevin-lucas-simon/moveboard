import {Vector3} from "three";
import {createContext, ReactNode, useEffect, useState} from "react";

export const DeviceMotionContext = createContext(new Vector3(0, -9.81, 0));

export type UserControlsProps = {
    children?: ReactNode|undefined,
}

export function UserControls(props: UserControlsProps) {
    const [combinedInputVector, setCombinedInputVector] = useState(new Vector3(0, -9.81, 0))

    const [deviceMotionVector, setDeviceMotionVector] = useState(null)
    const keyboardVector = useKeyboardControls()

    // add all vectors together
    useEffect(() => {
        const newCombinedInputVector = deviceMotionVector ?? new Vector3(0, -9.81, 0)
        newCombinedInputVector.add(keyboardVector)

        setCombinedInputVector(newCombinedInputVector)
    }, [deviceMotionVector, keyboardVector]);


    return (
        <>
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

function useKeyboardControls() {
    const [keyboardVector, setKeyboardVector] = useState(new Vector3(0, 0, 0))

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowUp':
                    setKeyboardVector(new Vector3(0, 0, -9.81))
                    break;
                case 'ArrowDown':
                    setKeyboardVector(new Vector3(0, 0, 9.81))
                    break;
                case 'ArrowLeft':
                    setKeyboardVector(new Vector3(-9.81, 0, 0))
                    break;
                case 'ArrowRight':
                    setKeyboardVector(new Vector3(9.81, 0, 0))
                    break;
                case ' ':
                    setKeyboardVector(new Vector3(0, 2*9.81, 0))
                    break;
            }
        }

        const handleKeyUp = () => {
            setKeyboardVector(new Vector3(0, 0, 0))
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    return keyboardVector
}
