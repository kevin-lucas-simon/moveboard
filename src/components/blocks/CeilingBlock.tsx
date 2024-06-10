import {BasicBlockProps} from "./BasicBlock";
import {useChunkRenderedWorldPosition} from "../chunks/Chunk";
import {RigidBody} from "@react-three/rapier";
import {useDebug} from "../hooks/useDebug";

export function CeilingBlock(props: BasicBlockProps) {
    const worldPosition = useChunkRenderedWorldPosition(props.position)
    const debug = useDebug()

    if (!worldPosition) {
        return null
    }

    return (
        <RigidBody position={worldPosition.toArray()} type={"fixed"}>
            <mesh>
                <boxGeometry args={props.dimension.toArray()} />
                <meshPhongMaterial color={'lightblue'} opacity={debug?.ceiling ? 0.25 : 0} transparent={true}/>
            </mesh>
        </RigidBody>
    );
}
