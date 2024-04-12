import {createContext, useState} from "react";
import {Euler} from "three";

export const DeviceRotationContext = createContext(new Euler());

export function UserControls({children}) {
    const [rotationRate, setRotationRate] = useState(null)
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

                            setRotationRate(e)
                            setRotationVector(euler)
                        })
                    }
                })
                .catch( console.error )
        } else {
            alert( "DeviceMotionEvent is not defined" );
        }
    }

    return (
        <>
            <div style={{height: "400px"}}>
                <DeviceRotationContext.Provider value={rotationVector}>
                    {children}
                </DeviceRotationContext.Provider>
            </div>
            <div>
                <button onClick={permission}>Click me</button>
                <hr></hr>
                <small>α: {rotationRate?.alpha}</small><br></br>
                <small>β: {rotationRate?.beta}</small><br></br>
                <small>γ: {rotationRate?.gamma}</small>
            </div>
        </>
    );
}
