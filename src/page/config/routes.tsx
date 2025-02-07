import {ErrorPage} from "../ErrorPage";
import {GamePage} from "../GamePage";
import {EditorPage} from "../EditorPage";

const routes = [
    {
        path: '/',
        element: <GamePage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/editor',
        element: <EditorPage />,
    }
];

export default routes;