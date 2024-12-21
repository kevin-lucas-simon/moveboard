import {NewElementModel} from "./NewElementModel";
import {Vector3} from "three";
import {useEffect} from "react";

/**
 * Debug element for unknown element types
 * @param props
 * @constructor
 */
export function NewUnknownElement(props: NewElementModel) {
    useEffect(() => {
        console.warn(`Unknown element type: ${props.type} on position (${props.position.x}, ${props.position.y}, ${props.position.z}).`);
    }, []);

    return (
        <group position={new Vector3().copy(props.position)}>
            <mesh>
                <sphereGeometry args={[0.75]}/>
                <meshPhongMaterial color={'black'} opacity={0.25} transparent={true}/>
            </mesh>
            <mesh>
                <sphereGeometry/>
                <meshPhongMaterial color={'orange'} opacity={0.5} transparent={true}/>
            </mesh>
        </group>
    );
}
