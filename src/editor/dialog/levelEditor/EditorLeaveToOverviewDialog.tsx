import {EditorDialogProps} from "../EditorDialogProps";
import {BasicDialog} from "../../../component/dialog/BasicDialog";
import {useNavigate} from "react-router-dom";

export function EditorLeaveToOverviewDialog(props: EditorDialogProps) {
    const navigate = useNavigate()

    const onSubmit = () => {
        navigate("/editor");
        props.onClose();
    }

    return (
        <BasicDialog
            title={"Leave to Overview"}
            isOpen={true}
            submitButton={"Leave"}
            onSubmit={onSubmit}
            onClose={props.onClose}
        >
            Are you sure to go to the editor overview?
        </BasicDialog>
    )
}
