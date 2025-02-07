import React, {createContext, useContext, useState} from "react";
import {BasicDialog} from "../dialog/BasicDialog";
import {Vector3} from "three";

const DeviceMotionContext = createContext<Vector3|null>(null);

export type DeviceApiProviderProps = {
    children: React.ReactNode,
}

/**
 * Appears at startup to request user permission that are essentially needed
 * @constructor
 */
export function DeviceApiProvider(props: DeviceApiProviderProps) {
    const [deviceMotionVector, startDeviceMotionApiRequest] = useAndRequestDeviceMotionApi();
    const [isGranted, setGranted] = useState<boolean>(false)

    function grantPermission() {
        if (isGranted) {
            return;
        }

        startDeviceMotionApiRequest();
        setGranted(true);
    }

    return (
        <>
            <BasicDialog
                title={"Moveboard Techdemo"}
                isOpen={!isGranted}
                onClose={grantPermission}
                closeButton={"Start demo"}
            >
                Utilisation of gravity and motion data in 3D web engine.
                <br/>
                Please use your smartphone.
            </BasicDialog>

            <DeviceMotionContext.Provider value={deviceMotionVector}>
                {props.children}
            </DeviceMotionContext.Provider>
        </>
    );
}

/**
 * Hook to access the device motion api (access modal needed)
 * @return
 */
export function useDeviceMotionApi(): Vector3|null {
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