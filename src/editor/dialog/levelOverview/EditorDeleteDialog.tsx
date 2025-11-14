import {EditorDialogProps} from "../EditorDialogProps";
import {BasicDialog} from "../../../component/dialog/BasicDialog";
import {localEditorDB} from "../../../data/localEditorDB";
import {EditorID} from "../../reducer/editorReducer";

export function EditorDeleteDialog(props: EditorDialogProps & {
    id: EditorID,
}) {
    const onSubmit = () => {
        localEditorDB.delete(props.id)
            .then(() => props.onClose())
    }

    return (
        <BasicDialog
            title={"Delete Level"}
            isOpen={true}
            submitButton={"Leave"}
            onSubmit={onSubmit}
            onClose={props.onClose}
        >
            Are you sure to delete this level?
        </BasicDialog>
    )
}
