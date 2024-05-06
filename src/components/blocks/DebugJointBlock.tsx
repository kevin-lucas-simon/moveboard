import {Vector3} from "three";
import {Edges} from "@react-three/drei";

export type DebugJointBlockProps = {
    position: Vector3,
    dimension: Vector3,
}

export function DebugJointBlock(props: DebugJointBlockProps) {
    return (
        <group
            position={props.position}
        >
            <mesh>
                <sphereGeometry args={[0.05]}/>
                <meshStandardMaterial color={"green"} />
            </mesh>
            <mesh>
                <boxGeometry args={props.dimension.toArray()} />
                <meshPhongMaterial color={"green"} opacity={0.25} transparent />
                <Edges color={"black"} />
            </mesh>
        </group>
    );
}
