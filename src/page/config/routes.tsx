import {ErrorPage} from "../ErrorPage";
import {GamePage} from "../GamePage";
import {EditorPage} from "../EditorPage";
import {EditorSelectorPage} from "../EditorSelectorPage";

const routes = [
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
        path: '/editor/:levelName',
        element: <EditorPage />,
        loader: ({params}: any) => {
            if (!params.levelName) {
                throw new Error("Level name is required in the URL");
            }
            return params.levelName;
        }
    }
];

export default routes;