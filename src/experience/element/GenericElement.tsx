import {Vector3} from "three";
import {useEffect} from "react";
import {ElementModel} from "../../model/ElementModel";

/**
 * Editor default values for generic elements
 * All element implementations are descendants from this object
 */
export const GenericElementDefault: ElementModel = {
    id: '', // TODO überlegen was ich hier mache
    type: GenericElement.name,
    position: {x: 0, y: 0, z: 0},
}

/**
 * Fallback element for unknown element types
 * @param props
 * @constructor
 */
export function GenericElement(props: ElementModel = GenericElementDefault) {
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
