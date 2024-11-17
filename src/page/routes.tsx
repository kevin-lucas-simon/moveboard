import {RootPage} from "./layout/RootPage";
import {ErrorPage} from "./layout/ErrorPage";
import {GamePage} from "./GamePage";
import {EditorPage} from "./EditorPage";

const routes = [
    {
        path: '/',
        element: <RootPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/game',
        element: <GamePage />,
    },
    {
        path: '/editor',
        element: <EditorPage />,
    }
];

export default routes;