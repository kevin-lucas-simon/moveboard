import {NewBasicBlockModel} from "./NewBasicBlock";
import {RigidBody} from "@react-three/rapier";
import {Vector3} from "three";
import {useDebug} from "../../hooks/useDebug";

export type NewBarrierBlockModel = NewBasicBlockModel

/**
 * Invisible block that acts as barrier for the player
 * @param props
 * @constructor
 */
export function NewBarrierBlock(props: NewBarrierBlockModel) {
    const debug = useDebug()

    return (
        <RigidBody position={new Vector3().copy(props.position)} type={"fixed"}>
            <mesh>
                <boxGeometry args={new Vector3().copy(props.dimension).toArray()} />
                <meshPhongMaterial color={'lightblue'} opacity={debug?.visible_barrier ? 0.25 : 0} transparent={true}/>
            </mesh>
        </RigidBody>
    );
}
