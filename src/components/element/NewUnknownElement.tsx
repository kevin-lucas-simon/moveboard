import {NewElementModel} from "./NewElementModel";
import {Vector3} from "three";

/**
 * Debug element for unknown element types
 * @param props
 * @constructor
 */
export function NewUnknownElement(props: NewElementModel) {
    console.warn(`Unknown element type: ${props.type} on position (${props.position.x}, ${props.position.y}, ${props.position.z}).`);

    return (
        <mesh position={new Vector3().copy(props.position)}>
            <sphereGeometry/>
            <meshPhongMaterial color={'black'} opacity={0.5} transparent={true}/>
        </mesh>
    );
}
