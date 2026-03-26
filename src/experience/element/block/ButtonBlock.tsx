import {ButtonBlockModel} from "../../../data/model/element/block/ButtonBlock";
import {CuboidCollider, RigidBody} from "@react-three/rapier";
import {useState} from "react";
import {Vector3} from "three";
import {Angle} from "../../../data/model/Angle";
import {BorderBlockMaterial} from "../../material/BorderBlockMaterial";

const buttonPadding = 0.1;
const buttonHeight = 0.2;
const buttonHeightPressed = 0.05;

export function ButtonBlock(props: ButtonBlockModel) {
    const [isPressed, setPressed] = useState(false);

    const colorActive = "green";
    const colorInactive = "gray";

    // TODO ich habe das Ziel, ja hier mit Farben zu verknüpfen auf welcher Ebene wir schalten
    // TODO daher muss ich Muster haben, die zb auf Chunki Ebene agieren
    // TODO Das Muster muss als Material gebaut werden, der Color selector muss das anzeigen und alle aktiven Elemente sollen dies austauschen dürfen
    // TODO das Material soll nachhaltig auch animationen haben aktiv und farblos bei deaktiviertem States

    // TODO backdrop mesh
    // TODO sensor area mesh
    // TODO interaction handling
    // TODO backdrop indicator coloring

    // TODO refactor color management, divide colors from normal colors and action colors
    // TODO Chunk Action Provider Pattern
    // TODO Rename ButtonBlock to ButtonSensor?
    // TODO Add Mechanism/Excecutor Component

    return (
        <group
            position={new Vector3().copy(props.position)}
            rotation={new Angle().copy(props.rotation).toEuler()}
        >
            <RigidBody type={"fixed"}>
                <mesh castShadow receiveShadow>
                    <boxGeometry args={new Vector3().copy(props.dimension).toArray()} />
                    <BorderBlockMaterial
                        innerColor={isPressed ? colorActive : colorInactive}
                        borderColor={"black"}
                        blockDimension={props.dimension}
                        borderThickness={0.1}
                    />
                </mesh>
            </RigidBody>

            <CuboidCollider
                sensor={true}
                position={[0, props.dimension.y/2, 0]}
                args={[
                    (props.dimension.x - 2*buttonPadding)/2,
                    buttonHeight,
                    (props.dimension.z - 2*buttonPadding)/2,
                ]}
                onIntersectionEnter={() => setPressed(true)}
                onIntersectionExit={() => setPressed(false)}
            >
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[
                        props.dimension.x - 2*buttonPadding,
                        isPressed ? buttonHeightPressed*2 : buttonHeight*2,
                        props.dimension.z - 2*buttonPadding,
                    ]}/>
                    <meshStandardMaterial color={isPressed ? colorActive : colorInactive} />
                </mesh>
            </CuboidCollider>
        </group>
    );
}
