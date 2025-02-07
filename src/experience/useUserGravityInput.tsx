import {Vector3, Vector3Like} from "three";
import {useDebugSettings} from "./DebugSettingsProvider";
import {useDeviceMotionContext} from "../component/api/DeviceMotionProvider";
import {useKeyboardKeysContext} from "../component/api/KeyboardKeysProvider";

const GRAVITATION = 9.81;
const KEYBOARD_SPEED = 2;
const DEVICE_MOTION_SPEED = 7.5;
// TODO into config

/**
 * Hook to get the current user gravity input vector
 */
export function useUserGravityInput(): Vector3Like {
    const keyboardVector = useKeyboardVector();
    const deviceMotionVector = useDeviceMotionContext();

    const isDisabled = useDebugSettings().pauseSimulation;

    // add gravity as default input
    const combinedVector = new Vector3(0, -GRAVITATION, 0);

    // disable user input if requested
    if (isDisabled) {
        return combinedVector;
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

    return combinedVector;
}

/**
 * Hook to get the current keyboard input vector
 */
function useKeyboardVector() {
    const keysDown = useKeyboardKeysContext();

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