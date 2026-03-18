import {Canvas, extend} from "@react-three/fiber";
import {Stats} from "@react-three/drei";
import {useSimulationSettings} from "../debug/settings/SimulationSettingsProvider";
import React from "react";
import {EnvironmentPhysics} from "./environment/EnvironmentPhysics";
import {EffectComposer, Outline, Selection} from "@react-three/postprocessing";
// @ts-ignore
import * as THREE from 'three/webgpu'
// @ts-ignore
import * as TSL from 'three/tsl'

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

    // TODO ist gl konstante hier notwendig?
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
            {/*<Selection>*/}
                <EnvironmentPhysics>
                    {props.children}
                </EnvironmentPhysics>

                {debug?.displayPerformanceStats &&
                    <Stats />
                }
                {/*<EffectComposer autoClear={false}>*/}
                {/*    <Outline*/}
                {/*        edgeStrength={10000}*/}
                {/*        visibleEdgeColor={0xff0000}*/}
                {/*        hiddenEdgeColor={0xff0000}*/}
                {/*    />*/}
                {/*</EffectComposer>*/}
            {/*</Selection>*/}
        </Canvas>
    )
}