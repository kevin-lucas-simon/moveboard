import {BasicDialog} from "../../../component/dialog/BasicDialog";
import {Textarea} from "@headlessui/react";
import {useEditorLevel} from "../../reducer/EditorProvider";
import React from "react";
import {EditorDialogProps} from "../EditorDialogProps";

export function EditorExportChangesDialog(props: EditorDialogProps) {
    const level = useEditorLevel();

    if (!level) {
        return <></>
    }

    function handleDownload() {
        const data = JSON.stringify(level);

        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "level.json";

        a.click();

        URL.revokeObjectURL(url);
    }

    return (
        <BasicDialog
            title="Export Level"
            isOpen={true}
            submitButton={"Download"}
            onSubmit={handleDownload}
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
