import {createContext, useState} from "react";
import {Euler} from "three";

export const DeviceRotationContext = createContext(new Euler());

const UserControlState = {
    Game: 'Game',
    Debug: 'Debug',
    NotStarted: null,
}

export function UserControls({children}) {
    const [userControlState, setUserControlState] = useState(UserControlState.NotStarted)
    const [rotationVector, setRotationVector] = useState(new Euler(0,0,0,'XYZ'))

    function permission () {
        if ( typeof( DeviceOrientationEvent ) !== "undefined" && typeof( DeviceOrientationEvent.requestPermission ) === "function" ) {
            DeviceOrientationEvent.requestPermission()
                .then( response => {
                    if ( response === "granted" ) {
                        window.addEventListener( "deviceorientation", (e) => {
                            // calculation order always: alpha, beta, gamma!
                            // https://stackoverflow.com/questions/11814488/webgl-opengl-rotate-camera-according-to-device-orientation
                            const euler = new Euler(
                                e.beta * Math.PI / 180,
                                e.alpha * Math.PI / 180,
                                -e.gamma * Math.PI / 180,
                                'YXZ',
                            )
                            euler.reorder('XYZ')

                            setUserControlState(UserControlState.Game)
                            setRotationVector(euler)
                        })
                    }
                })
                .catch( console.error )
        } else {
            setUserControlState(UserControlState.Debug)
            alert( "DeviceMotionEvent is not defined. Debug mode is activated." );
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
            <DeviceRotationContext.Provider value={rotationVector}>
                {children}
            </DeviceRotationContext.Provider>
        </>
    );
}
