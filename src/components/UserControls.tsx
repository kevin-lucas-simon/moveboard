import {Vector3} from "three";
import {createContext, ReactNode, useEffect, useState} from "react";
import {StartModal} from "./gui/StartModal";

const GRAVITATION = 9.81;
const KEYBOARD_SPEED = 2;
const DEVICE_MOTION_SPEED = 5;

export const DeviceMotionContext = createContext(new Vector3(0, -9.81, 0));

export type UserControlsProps = {
    children?: ReactNode|undefined,
}

/**
 * Component to handle user input from keyboard and device motion
 * @param props
 * @constructor
 */
export function UserControls(props: UserControlsProps) {
    const [controlsActive, setControlsActive] = useState(false)
    const [combinedInputVector, setCombinedInputVector] = useState(new Vector3(0, -9.81, 0))

    const [deviceMotionVector, clickDeviceMotionPermission] = useDeviceMotionControls();
    const keyboardVector = useKeyboardControls();

    // add all vectors together
    useEffect(() => {
        const newCombinedInputVector = new Vector3(0, -GRAVITATION, 0)

        // apply device sensor input as basis if available
        if (deviceMotionVector) {
            newCombinedInputVector
                .copy(deviceMotionVector)
                .multiplyScalar(DEVICE_MOTION_SPEED)
        }

        // apply keyboard input
        newCombinedInputVector.add(
            keyboardVector
                .multiply(new Vector3(1, 2, 1))
                .multiplyScalar(KEYBOARD_SPEED*GRAVITATION)
        )

        // save combined vector
        setCombinedInputVector(newCombinedInputVector)
    }, [deviceMotionVector, keyboardVector]);

    // handle start modal
    function handleSubmit() {
        clickDeviceMotionPermission()
        setControlsActive(true)
    }

    return (
        <>
            {/* TODO permissions ins Menü auslagern -> in dieser Klasse nur auf Event zugreifen, ohne zu fragen! */}
            {!controlsActive &&
                <StartModal onSubmit={handleSubmit} />
            }
            <DeviceMotionContext.Provider value={combinedInputVector}>
                {props.children}
            </DeviceMotionContext.Provider>
        </>
    );
}

/**
 * Hook to get the current device motion vector (mobile devices)
 */
function useDeviceMotionControls() {
    const [deviceMotionVector, setDeviceMotionVector]
        = useState<Vector3|null>(null);

    const clickDeviceMotionPermission = () => {
        if (typeof (DeviceMotionEvent as any)?.requestPermission === 'function') {
            (DeviceMotionEvent as any).requestPermission()
                .then((permissionState: string) => {
                    if (permissionState === 'granted') {
                        window.addEventListener('devicemotion', handleDeviceMotion);
                    }
                })
        } else {
            // fallback for browsers who do not need an authorisation
            window.addEventListener('devicemotion', handleDeviceMotion);
        }
    };

    const handleDeviceMotion = (event: any) => {
        if (deviceMotionVector) {
            setDeviceMotionVector(new Vector3(
                event.accelerationIncludingGravity.x,
                event.accelerationIncludingGravity.z,
                -event.accelerationIncludingGravity.y
            ));
        }
    };

    return [deviceMotionVector, clickDeviceMotionPermission] as const;
}

/**
 * Hook to get the current keyboard input vector
 */
function useKeyboardControls() {
    const [keysDown, setKeysDown]
        = useState(new Set<string>())
    const [keyboardVector, setKeyboardVector]
        = useState(new Vector3(0, 0, 0))

    // add keyboard event listeners
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
        // eslint-disable-next-line
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