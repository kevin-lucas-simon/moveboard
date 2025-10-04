import {BasicDialog} from "../../component/dialog/BasicDialog";
import {Textarea} from "@headlessui/react";
import {useEditorLevel} from "../reducer/EditorProvider";
import React from "react";

export type ExportChangesDialogProps = {
    onClose: () => void;
}

export function ExportChangesDialog(props: ExportChangesDialogProps) {
    const level = useEditorLevel();

    if (!level) {
        return <></>
    }

    return (
        <BasicDialog
            title="Export Level"
            isOpen={true}
            onClose={props.onClose}
        >
            <div>Export the JSON data of the current edited level.</div>
            <Textarea
                className="w-full h-32 p-2 bg-gray-500/5 rounded-md text-xs"
                value={JSON.stringify(level)}
                readOnly
            />
        </BasicDialog>
    );
}
