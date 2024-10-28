import {BasicBlockProps} from "./BasicBlock";
import {RigidBody} from "@react-three/rapier";
import {useDebug} from "../hooks/useDebug";
import {useChunkPosition} from "../hooks/useChunkPosition";
import {useVector3} from "../serializer/toVector3";

/**
 * Invisible block that acts as barrier for the player
 * @param props
 * @constructor
 */
export function BarrierBlock(props: BasicBlockProps) {
    const position = useVector3(props.position)
    const dimension = useVector3(props.dimension)

    const worldPosition = useChunkPosition(position)
    const debug = useDebug()

    if (!worldPosition) {
        return null
    }

    return (
        <RigidBody position={worldPosition.toArray()} type={"fixed"}>
            <mesh>
                <boxGeometry args={dimension.toArray()} />
                <meshPhongMaterial color={'lightblue'} opacity={debug?.visible_barrier ? 0.25 : 0} transparent={true}/>
            </mesh>
        </RigidBody>
    );
}
