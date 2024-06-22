import {Euler, Vector3} from "three";
import {createContext, ReactNode, useEffect, useState} from "react";
import {StartModal} from "./gui/StartModal";

const GRAVITATION = 9.81;
const MOTION_SPEED_KEYBOARD = 0.5;
const MOTION_SPEED_DEVICE_SENSOR = 5;

export const DeviceMotionContext = createContext(new Vector3(0, -9.81, 0));
export const DeviceOrientationContext = createContext(new Euler());

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

    const [combinedMotion, setCombinedMotion] = useState(new Vector3(0, -9.81, 0))
    const [combinedOrientation, setCombinedOrientation] = useState(new Euler())

    const [deviceMotion, deviceOrientation, clickDevicePermission] = useDeviceSensor();
    const keyboardMotion = useKeyboardControls();

    // combine keyboard and device sensor input
    useEffect(() => {
        const newCombinedMotion = new Vector3(0, -GRAVITATION, 0)
        const newCombinedOrientation = new Euler()

        // apply device sensor as basis if available
        if (deviceMotion && deviceOrientation) {
            newCombinedMotion
                .copy(deviceMotion)
                .multiplyScalar(MOTION_SPEED_DEVICE_SENSOR)
            newCombinedOrientation
                .copy(deviceOrientation)
        }

        // apply keyboard input
        newCombinedMotion.add(
            keyboardMotion
                .multiply(new Vector3(GRAVITATION, 5*GRAVITATION, GRAVITATION))
                .multiplyScalar(MOTION_SPEED_KEYBOARD)
        )
        // TODO integrate keyboard orientation

        // save combined values
        setCombinedMotion(newCombinedMotion)
        setCombinedOrientation(newCombinedOrientation)
    }, [deviceMotion, deviceOrientation, keyboardMotion]);

    // handle start modal
    function handleSubmit() {
        clickDevicePermission()
        setControlsActive(true)
    }

    return (
        <>
            {/* TODO permissions ins Menü auslagern -> in dieser Klasse nur auf Event zugreifen, ohne zu fragen! */}
            {!controlsActive &&
                <StartModal onSubmit={handleSubmit} />
            }
            <DeviceMotionContext.Provider value={combinedMotion}>
                <DeviceOrientationContext.Provider value={combinedOrientation}>
                    {props.children}
                </DeviceOrientationContext.Provider>
            </DeviceMotionContext.Provider>
        </>
    );
}

/**
 * Hook to get the current device sensor values (mobile devices)
 */
function useDeviceSensor() {
    const [deviceMotion, setDeviceMotion]
        = useState<Vector3|null>(null);
    const [deviceOrientation, setDeviceOrientation]
        = useState<Euler|null>(null);

    const clickDevicePermission = () => {
        if (typeof (DeviceMotionEvent as any)?.requestPermission === 'function') {
            (DeviceMotionEvent as any).requestPermission()
                .then((permissionState: string) => {
                    if (permissionState === 'granted') {
                        window.addEventListener('devicemotion', handleDeviceMotion);
                        window.addEventListener('deviceorientation', handleDeviceOrientation);
                    }
                })
        } else {
            // fallback for browsers who do not need an authorisation
            window.addEventListener('devicemotion', handleDeviceMotion);
            window.addEventListener('deviceorientation', handleDeviceOrientation);
        }
    };

    const handleDeviceMotion = (event: any) => {
        setDeviceMotion(new Vector3(
            event.accelerationIncludingGravity.x,
            event.accelerationIncludingGravity.z,
            -event.accelerationIncludingGravity.y
        ));
    };

    const handleDeviceOrientation = (event: any) => {
        // https://stackoverflow.com/questions/11814488/webgl-opengl-rotate-camera-according-to-device-orientation
        setDeviceOrientation(new Euler(
            event.beta * Math.PI / 180,
            event.alpha * Math.PI / 180,
            -event.gamma * Math.PI / 180,
            'YXZ',
        ));
    };

    return [deviceMotion, deviceOrientation, clickDevicePermission] as const;
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