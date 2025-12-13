import {PageError} from "./PageError";
import {PageGame} from "./PageGame";
import {PageEditorLevel} from "./PageEditorLevel";
import {PageEditorOverview} from "./PageEditorOverview";

export const routes = [
    {
        path: '/',
        element: <PageGame />,
        errorElement: <PageError />,
    },
    {
        path: '/editor',
        element: <PageEditorOverview />,
    },
    {
        path: '/editor/:editorID',
        element: <PageEditorLevel />,
        loader: ({params}: any) => {
            if (!params.editorID) {
                throw new Error("Editor ID is required in the URL");
            }
            return params.editorID;
        }
    }
];