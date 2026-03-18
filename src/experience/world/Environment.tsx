import {Canvas, extend} from "@react-three/fiber";
import {Stats} from "@react-three/drei";
import {useSimulationSettings} from "../debug/settings/SimulationSettingsProvider";
import React from "react";
import {EnvironmentPhysics} from "./environment/EnvironmentPhysics";
// @ts-ignore
import * as THREE from 'three/webgpu'

export type EnvironmentProps = {
    children?: React.ReactNode | undefined,
}

/**
 * Main game experience component to wrap the game and physics engine
 * @param props
 * @constructor
 */
export function Environment(props: EnvironmentProps) {
    const debug = useSimulationSettings();

    return (
        <Canvas
            shadows
            resize={{ debounce: 0 }}
            gl={(props) => {
                extend(THREE)
                const renderer = new THREE.WebGPURenderer(props)
                return renderer.init().then(() => renderer)
            }}
        >
            <EnvironmentPhysics>
                {props.children}
            </EnvironmentPhysics>

            {debug?.displayPerformanceStats &&
                <Stats />
            }
        </Canvas>
    )
}