import {BasicDialog} from "../../component/dialog/BasicDialog";
import {Textarea} from "@headlessui/react";
import {LevelModel} from "../../data/model/world/LevelModel";

export type ExportChangesDialogProps = {
    onClose: () => void;
    level: LevelModel;
}

export function ExportChangesDialog(props: ExportChangesDialogProps) {
    return (
        <BasicDialog
            title="Export Level"
            isOpen={true}
            onClose={props.onClose}
        >
            <div>Export the JSON data of the current edited level.</div>
            <Textarea
                className="w-full h-32 p-2 bg-gray-500/5 rounded-md text-xs"
                value={JSON.stringify(props.level)}
                readOnly
            />
        </BasicDialog>
    );
}
