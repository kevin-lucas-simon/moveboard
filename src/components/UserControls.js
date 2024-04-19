import {createContext, useState} from "react";
import {Vector3} from "three";

export const DeviceMotionContext = createContext(new Vector3(0, -9.81, 0));

const UserControlState = {
    Game: 'Game',
    Debug: 'Debug',
    NotStarted: null,
}

export function UserControls({children}) {
    const [userControlState, setUserControlState] = useState(UserControlState.NotStarted)
    const [motionVector, setMotionVector] = useState(new Vector3(0, -9.81, 0))

    function permission () {
        if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
            DeviceMotionEvent.requestPermission()
                .then( response => {
                    if ( response === "granted" ) {
                        window.addEventListener( "devicemotion", (e) => {
                            const realScreenSizeToSimulationFactor = 10; // TODO diese Logik einbauen https://jsfiddle.net/peteng/6MmvB/

                            setMotionVector(new Vector3(
                                e.accelerationIncludingGravity.x * realScreenSizeToSimulationFactor,
                                e.accelerationIncludingGravity.z * realScreenSizeToSimulationFactor,
                                -e.accelerationIncludingGravity.y * realScreenSizeToSimulationFactor,
                            ))
                            setUserControlState(UserControlState.Game)
                        })
                    }
                })
                .catch( console.error )
        } else {
            setUserControlState(UserControlState.Debug)
            // alert( "DeviceMotionEvent is not defined. Debug mode is activated." );
        }
    }

    return (
        <>
            {userControlState === UserControlState.NotStarted &&
                <div className="fixed z-10 w-full h-full flex items-center justify-center backdrop-blur p-8">
                    <div className="bg-white rounded p-8">
                        <h1 className="text-2xl font-bold mb-2">
                            Moveboard Techdemo
                        </h1>
                        <p className="mb-2">
                            Utilisation of gravity and motion data in 3D web engine.
                            <br/>
                            Please use your smartphone.
                        </p>
                        <button
                            onClick={permission}
                            className="border-2 border-black bg-black text-white rounded p-1 hover:bg-white hover:text-black transition"
                        >
                            Start demo
                        </button>
                    </div>
                </div>
            }
            <DeviceMotionContext.Provider value={motionVector}>
                {children}
            </DeviceMotionContext.Provider>
        </>
    );
}
