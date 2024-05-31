import {BasicBlockProps} from "./BasicBlock";
import {useChunkWorldPosition} from "../chunks/Chunk";
import {RigidBody} from "@react-three/rapier";

export function CeilingBlock(props: BasicBlockProps) {
    const worldPosition = useChunkWorldPosition(props.position)
    if (!worldPosition) {
        return null
    }

    return (
        <RigidBody position={worldPosition.toArray()} type={"fixed"}>
            <mesh>
                <boxGeometry args={props.dimension.toArray()} />
                <meshPhongMaterial color={'lightblue'} opacity={0.1} transparent={true}/>
            </mesh>
        </RigidBody>
    );
}
