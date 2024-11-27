import {NewJointModel} from "../model/NewJointModel";
import {Vector3} from "three";

export type NewJointProps = NewJointModel & {

}

export function NewJoint(props: NewJointProps) {
    // TODO Collider Box for joint and emit as function prop

    return (
        <group position={new Vector3().copy(props.position)}>
            <mesh>
                <sphereGeometry args={[0.05]}/>
                <meshStandardMaterial color={"green"}/>
            </mesh>
            <mesh>
                <boxGeometry args={new Vector3().copy(props.dimension).toArray()}/>
                <meshPhongMaterial color={"green"} opacity={0.25} transparent/>
            </mesh>
        </group>
    );
}
