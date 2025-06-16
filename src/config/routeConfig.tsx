import {ErrorPage} from "../page/ErrorPage";
import {GamePage} from "../page/GamePage";
import {EditorPage} from "../page/EditorPage";
import {EditorSelectorPage} from "../page/EditorSelectorPage";

const routeConfig = [
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

export default routeConfig;