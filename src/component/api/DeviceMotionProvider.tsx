import React, {createContext, useContext, useEffect, useState} from "react";
import {Vector3} from "three";

const DeviceMotionContext = createContext<Vector3|null>(null);

export type DeviceApiProviderProps = {
    isGranted: boolean,
    children: React.ReactNode,
}

/**
 * Appears at startup to request user permission that are essentially needed
 * @constructor
 */
export function DeviceMotionProvider(props: DeviceApiProviderProps) {
    const [deviceMotionVector, startDeviceMotionApiRequest] = useAndRequestDeviceMotionApi();

    useEffect(() => {
        if (props.isGranted) {
            startDeviceMotionApiRequest()
        }
    }, [startDeviceMotionApiRequest, props.isGranted])

    return (
        <DeviceMotionContext.Provider value={deviceMotionVector}>
            {props.children}
        </DeviceMotionContext.Provider>
    );
}

/**
 * Hook to access the device motion api (access modal needed)
 * @return
 */
export function useDeviceMotionContext(): Vector3|null {
    return useContext(DeviceMotionContext);
}

/**
 * Hook to access the device motion api and request permission (needed for iOS devices)
 * @return
 */
function useAndRequestDeviceMotionApi() {
    const [deviceMotionVector, setDeviceMotionVector]
        = useState<Vector3|null>(null);

    const handleDeviceMotion = (event: any) => {
        setDeviceMotionVector(new Vector3(
            event.accelerationIncludingGravity.x,
            event.accelerationIncludingGravity.z,
            -event.accelerationIncludingGravity.y
        ));
    };

    const startDeviceMotionApiRequest = () => {
        const isPermissionRequestNeeded = typeof (DeviceMotionEvent as any)?.requestPermission === 'function';

        // no permission needed
        if (!isPermissionRequestNeeded) {
            window.addEventListener('devicemotion', handleDeviceMotion);
            return;
        }

        // permission needed (iOS devices)
        (DeviceMotionEvent as any)
            .requestPermission()
            .then((permissionState: string) => {
                if (permissionState === 'granted') {
                    window.addEventListener('devicemotion', handleDeviceMotion);
                }
            });
    };

    return [deviceMotionVector, startDeviceMotionApiRequest] as const;
}