import {EditorDialogProps} from "./EditorDialogProps";
import {BasicDialog} from "../../component/dialog/BasicDialog";
import {useNavigate} from "react-router-dom";

export function EditorLeaveDialog(props: EditorDialogProps) {
    const navigate = useNavigate()

    const onSubmit = () => {
        navigate("/editor");
        props.onClose();
    }

    return (
        <BasicDialog
            title={"Leave Editor"}
            isOpen={true}
            submitButton={"Leave"}
            onSubmit={onSubmit}
            onClose={props.onClose}
        >
            <div>Are you sure to leave the editor?</div>
        </BasicDialog>
    )
}
