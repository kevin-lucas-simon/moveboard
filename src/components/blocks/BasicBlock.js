import {Component} from "react";
import {RigidBody} from "@react-three/rapier";
import {Vector3} from "three";

export class BasicBlock extends Component {
    constructor(
        key,
        position = new Vector3(0,0,0),
        dimension = new Vector3(1,1,1),
        color = "grey"
    ) {
        super();
        this.key = key;
        this.position = position;
        this.dimension = dimension;
        this.color = color;
    }

    render() {
        return (
            <RigidBody key={this.key} type={"fixed"}>
                <mesh position={[
                    this.position.x + Math.abs(this.dimension.x)/2,
                    this.position.y + Math.abs(this.dimension.y)/2,
                    this.position.z + Math.abs(this.dimension.z)/2,
                ]}>
                    <boxGeometry args={[
                        Math.abs(this.dimension.x),
                        Math.abs(this.dimension.y),
                        Math.abs(this.dimension.z),
                    ]} />
                    <meshStandardMaterial color={this.color} />
                </mesh>
            </RigidBody>
        )
    }
}