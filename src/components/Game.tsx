import {UserControls} from "./UserControls";
import {ReactNode} from "react";
import {Experience} from "./Experience";

export type GameProps = {
    children?: ReactNode|undefined,
}

export function Game(props: GameProps) {
    return (
        <UserControls>
            {/* TODO Speicherung von Config über LocalStorage */}
            <Experience>
                {props.children}
            </Experience>
        </UserControls>
    );
}
