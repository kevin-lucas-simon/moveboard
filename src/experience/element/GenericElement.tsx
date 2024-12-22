import {Vector3, Vector3Like} from "three";
import {useEffect} from "react";

/**
 * API data model for generic elements
 * All element implementations are descendants from this interface
 */
export type GenericElementModel = {
    type: string,
    position: Vector3Like,
}

/**
 * Editor default values for generic elements
 * All element implementations are descendants from this object
 */
export const GenericElementDefault: GenericElementModel = {
    type: GenericElement.name,
    position: {x: 0, y: 0, z: 0},
}

/**
 * Fallback element for unknown element types
 * @param props
 * @constructor
 */
export function GenericElement(props: GenericElementModel = GenericElementDefault) {
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
