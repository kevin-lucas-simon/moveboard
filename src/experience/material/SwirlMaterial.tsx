import {useMemo} from "react";
import { abs, add, color, fract, length, mul, positionLocal, sin, step, sub, time } from 'three/tsl';

export function SwirlMaterial(props: {
    color: string;
}) {
    const colorNode = useMemo(() => {
        const _node0 = positionLocal;
        const _node1 = time;
        const _node2 = color(props.color);
        const _node3 = mul(_node0, 5);
        const _node4 = fract(_node3);
        const _node5 = sub(_node4, 0.5);
        const _node6 = length(_node5);
        const _node7 = mul(_node6, 10);
        const _node8 = add(_node7, _node1);
        const _node9 = sin(_node8);
        const _node10 = abs(_node9);
        const _node11 = step(0.5, _node10);

        return mul(_node2, _node11);
    }, [props.color]);

    return <meshStandardNodeMaterial key={props.color} colorNode={colorNode} />
}
