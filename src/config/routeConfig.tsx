import {ErrorPage} from "../page/ErrorPage";
import {GamePage} from "../page/GamePage";
import {EditorPage} from "../page/EditorPage";
import {EditorSelectorPage} from "../page/EditorSelectorPage";

export const routeConfig = [
    {
        path: '/',
        element: <GamePage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/editor',
        element: <EditorSelectorPage />,
    },
    {
        path: '/editor/:editorID',
        element: <EditorPage />,
        loader: ({params}: any) => {
            if (!params.editorID) {
                throw new Error("Editor ID is required in the URL");
            }
            return params.editorID;
        }
    }
]; // TODO schieb es in den page ordner