import {BasicDialog} from "./BasicDialog";
import React from "react";

export type StartupModalProps = {
    isStarted: boolean,
    onStart: () => void,
}
export function StartupModal(props: StartupModalProps) {
    return (
        <BasicDialog
            title={"Moveboard Techdemo"}
            isOpen={!props.isStarted}
            onClose={props.onStart}
            closeButton={"Start demo"}
        >
            Utilisation of gravity and motion data in 3D web engine.
            <br/>
            Please use your smartphone.
        </BasicDialog>
    );
}
