import {createContext, useState} from "react";
import {Euler, Quaternion} from "three";

export const RotationContext = createContext(1);

export function UserControls({children}) {
    const [rotationRate, setRotationRate] = useState(null)
    const [rotationVector, setRotationVector] = useState(new Euler(0,0,0,'XYZ'))

    function permission () {
        if ( typeof( DeviceOrientationEvent ) !== "undefined" && typeof( DeviceOrientationEvent.requestPermission ) === "function" ) {
            // (optional) Do something before API request prompt.
            DeviceOrientationEvent.requestPermission()
                .then( response => {
                    // (optional) Do something after API prompt dismissed.
                    if ( response == "granted" ) {
                        window.addEventListener( "deviceorientation", (e) => {
                            setRotationRate(e)

                            // correct
                            // const euler = new Euler(
                            //     (e.beta || 0) * (Math.PI / 180),
                            //     (e.alpha || 0) * (Math.PI / 180),
                            //     (-e.gamma || 0) * (Math.PI / 180),
                            //     'XYZ'
                            // )

                            const euler = new Euler(
                                (e.beta || 0) * (Math.PI / 360),
                                0,
                                (-e.gamma || 0) * (Math.PI / 360),
                                'XYZ'
                            )

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
                <RotationContext.Provider value={rotationVector}>
                    {children}
                </RotationContext.Provider>
            </div>
            <div>
                <button onClick={permission}>Click me</button>
                <hr></hr>
                <small>α: {rotationRate?.alpha}</small><br></br>
                <small>β: {rotationRate?.beta}</small><br></br>
                <small>γ: {rotationRate?.gamma}</small>
                <hr></hr>
                <small>x: {rotationVector.x}</small><br></br>
                <small>y: {rotationVector.y}</small><br></br>
                <small>z: {rotationVector.z}</small>
            </div>
        </>
    );
}
