import {ButtonBlockModel} from "../../../data/model/element/block/ButtonBlock";
import {CuboidCollider, RigidBody} from "@react-three/rapier";
import {Color, Vector3} from "three";
import {Angle} from "../../../data/model/Angle";
import {useNodeBorder} from "../../material/useNodeBorder";
import {useSensor} from "../../reducer/SensorReactorProvider";
import {useElementColoring} from "../../structure/coloring/useElementColoring";
import {ColorTypes} from "../../../data/model/Color";
import {useUniform} from "../../material/useUniform";

const buttonPadding = 0.1;
const buttonHeight = 0.2;
const buttonHeightPressed = 0.05;

export function ButtonBlock(props: ButtonBlockModel) {
    const [isPressed, setPressed] = useSensor(props.id, props.outputChannel);

    const colorBase = useElementColoring(ColorTypes.Light);
    const colorBaseDark = useElementColoring(ColorTypes.Dark);
    const colorActive = useElementColoring(ColorTypes.Primary);

    const colorNode = useUniform<Color>(new Color(isPressed ? colorActive : colorBase));
    const colorBorderNode = useUniform<Color>(new Color(colorBaseDark));

    const nodeBorder = useNodeBorder({
        blockDimension: props.dimension,
        borderThickness: 0.1,
        borderColor: colorBorderNode,
        innerColor: colorNode,
    })

    // TODO ich habe das Ziel, ja hier mit Farben zu verknüpfen auf welcher Ebene wir schalten
    // TODO daher muss ich Muster haben, die zb auf Chunki Ebene agieren
    // TODO backdrop mesh
    // TODO backdrop indicator coloring
    // TODO Rename ButtonBlock to ButtonSensor?

    return (
        <group
            position={new Vector3().copy(props.position)}
            rotation={new Angle().copy(props.rotation).toEuler()}
        >
            <RigidBody
                key={JSON.stringify(props)}
                type={"fixed"}
            >
                <mesh castShadow receiveShadow>
                    <boxGeometry args={new Vector3().copy(props.dimension).toArray()} />
                    <meshStandardNodeMaterial colorNode={nodeBorder} />
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
                    <meshStandardMaterial color={isPressed ? colorActive : colorBase} />
                </mesh>
            </CuboidCollider>
        </group>
    );
}
