import {BasicBlockProps} from "./BasicBlock";
import {RigidBody} from "@react-three/rapier";
import {useDebug} from "../hooks/useDebug";
import {useVector3, useWorldPosition} from "../hooks/toVector3";

/**
 * Invisible block that acts as barrier for the player
 * @param props
 * @constructor
 */
export function BarrierBlock(props: BasicBlockProps) {
    const position = useWorldPosition(props.position)
    const dimension = useVector3(props.dimension)
    const debug = useDebug()

    return (
        <RigidBody position={position.toArray()} type={"fixed"}>
            <mesh>
                <boxGeometry args={dimension.toArray()} />
                <meshPhongMaterial color={'lightblue'} opacity={debug?.visible_barrier ? 0.25 : 0} transparent={true}/>
            </mesh>
        </RigidBody>
    );
}
