import {Vector3} from "three";
import {useEffect} from "react";
import {ElementDefault, ElementModel} from "../../data/model/element/ElementModel";

export function GenericElement(props: ElementModel = ElementDefault) {
    useEffect(() => {
        console.warn(`Unknown element type: ${props.type} on position (${props.position.x}, ${props.position.y}, ${props.position.z}).`);
    }, [props.position.x, props.position.y, props.position.z, props.type]);

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
