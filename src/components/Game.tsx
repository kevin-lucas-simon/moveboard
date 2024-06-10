import {UserControls} from "./UserControls";
import {ReactNode} from "react";
import {Experience} from "./Experience";

export type GameProps = {
    children?: ReactNode|undefined,
}

export function Game(props: GameProps) {
    return (
        <UserControls>
            {/* TODO Übergreifendes Menü mit Permission-Abfrage -> dann erst <UserControls> einblenden! */}
            <Experience>
                {props.children}
            </Experience>
        </UserControls>
    );
}
