import {useEffect, useState} from "react";
import {Vector3, Vector3Like} from "three";
import {useDebugSettings} from "./DebugSettingsProvider";

const GRAVITATION = 9.81;
const KEYBOARD_SPEED = 2;
const DEVICE_MOTION_SPEED = 5;
// TODO into config

/**
 * Hook to get the current user gravity input vector
 */
export function useUserGravityInput(): [
    Vector3Like,
    () => void,
] {
    const keyboardVector = useKeyboardControls();
    const [deviceMotionVector, requestDeviceMotionPermission] = useDeviceMotionControls();
    const isDisabled = useDebugSettings().pauseSimulation;

    // add gravity as default input
    const combinedVector = new Vector3(0, -GRAVITATION, 0);

    // disable user input if requested
    if (isDisabled) {
        return [combinedVector, requestDeviceMotionPermission];
    }

    // replace with device sensor input if available
    if (deviceMotionVector) {
        combinedVector
            .copy(deviceMotionVector)
            .multiplyScalar(DEVICE_MOTION_SPEED)
    }

    // add keyboard input
    combinedVector.add(
        keyboardVector
            .multiply(new Vector3(1, 2, 1))
            .multiplyScalar(KEYBOARD_SPEED*GRAVITATION)
    )

    return [combinedVector, requestDeviceMotionPermission];
}

/**
 * Hook to get the current device motion vector (mobile devices)
 */
function useDeviceMotionControls() {
    const [deviceMotionVector, setDeviceMotionVector]
        = useState<Vector3|null>(null);

    const handleDeviceMotion = (event: any) => {
        if (deviceMotionVector) {
            setDeviceMotionVector(new Vector3(
                event.accelerationIncludingGravity.x,
                event.accelerationIncludingGravity.z,
                -event.accelerationIncludingGravity.y
            ));
        }
    };

    const requestDeviceMotionPermission = () => {
        // request permission for device motion on apple devices
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

    return [deviceMotionVector, requestDeviceMotionPermission] as const;
}

/**
 * Hook to get the current keyboard input vector
 */
function useKeyboardControls() {
    const [keysDown, setKeysDown]
        = useState<string[]>([])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!keysDown.includes(event.key)) {
                setKeysDown([...keysDown, event.key])
            }
        }
        const handleKeyUp = (event: KeyboardEvent) => {
            if (keysDown.includes(event.key)) {
                setKeysDown(keysDown.filter(key => key !== event.key))
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [keysDown])

    const keyboardVector = new Vector3(0, 0, 0)

    if (keysDown.includes('ArrowUp') || keysDown.includes('w')) {
        keyboardVector.add(new Vector3(0, 0, -1))
    }
    if (keysDown.includes('ArrowDown') || keysDown.includes('s')) {
        keyboardVector.add(new Vector3(0, 0, 1))
    }
    if (keysDown.includes('ArrowLeft') || keysDown.includes('a')) {
        keyboardVector.add(new Vector3(-1, 0, 0))
    }
    if (keysDown.includes('ArrowRight') || keysDown.includes('d')) {
        keyboardVector.add(new Vector3(1, 0, 0))
    }
    if (keysDown.includes(' ')) {
        keyboardVector.add(new Vector3(0, 1, 0))
    }

    keyboardVector.normalize()

    return keyboardVector
}