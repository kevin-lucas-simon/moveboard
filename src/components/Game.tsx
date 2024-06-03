import {UserControls} from "./UserControls";
import {ReactNode, useMemo} from "react";
import {Experience} from "./Experience";

const Controls = {
    top: 'top',
    bottom: 'bottom',
    left: 'left',
    right: 'right',
    jump: 'jump',
}

export type GameProps = {
    children?: ReactNode | undefined,
}

export function Game(props: GameProps) {
    const keyboardControls = useMemo(()=>[
        { name: Controls.top, keys: ['ArrowUp'] },
        { name: Controls.bottom, keys: ['ArrowDown'] },
        { name: Controls.left, keys: ['ArrowLeft'] },
        { name: Controls.right, keys: ['ArrowRight'] },
        { name: Controls.jump, keys: ['Space'] },
    ], [])

    return (
        <UserControls>
            <Experience>
                {props.children}
            </Experience>
        </UserControls>
    );
}
