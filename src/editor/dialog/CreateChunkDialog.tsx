import {BasicDialog} from "../../component/dialog/BasicDialog";
import {useState} from "react";

export type CreateChunkDialogProps = {
    isOpen: boolean;
    existingChunkNames: string[];
    onClose: () => void;
    onSubmit: (name: string) => void;
}

export function CreateChunkDialog(props: CreateChunkDialogProps) {
    const [chunkName, setChunkName] = useState<string>("");
    const isDisabled = [...props.existingChunkNames, ""].includes(chunkName);

    const handleClose = () => {
        setChunkName("");
        props.onClose();
    }

    const handleSubmit = () => {
        if (isDisabled) {
            return;
        }
        props.onSubmit(chunkName);
        setChunkName("");
    }

    return (
        <BasicDialog
            title={"Create Chunk"}
            submitButton={"Create"}
            isOpen={props.isOpen}
            onClose={handleClose}
            onSubmit={handleSubmit}
            isDisabled={isDisabled}
        >
            <p className="mb-2">
                Enter a name for the new chunk. It can be connected to other chunks with joints.
            </p>
            <input
                value={chunkName}
                onChange={e => setChunkName(e.target.value)}
                className="w-full p-2 border border-gray-300 bg-transparent rounded"
            />
            {isDisabled && (
                <small className="text-gray-400">
                    Chunk name must be unique and cannot be empty.
                </small>
            )}
        </BasicDialog>
    );
}
