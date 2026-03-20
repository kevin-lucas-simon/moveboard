import {Canvas, extend} from "@react-three/fiber";
import {Stats} from "@react-three/drei";
import {useSimulationSettings} from "../debug/settings/SimulationSettingsProvider";
import React from "react";
import {EnvironmentPhysics} from "./environment/EnvironmentPhysics";
import * as THREE from 'three/webgpu'

export type EnvironmentProps = {
    children?: React.ReactNode | undefined,
}

// @ts-ignore
extend(THREE)

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
            gl={async (props) => {
                // @ts-ignore
                const renderer = new THREE.WebGPURenderer(props)
                await renderer.init();
                return renderer;
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