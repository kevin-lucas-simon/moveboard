import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import routes from "./page/config/routes";
import {DeviceApiProvider} from "./component/api/DeviceApiProvider";

const router = createBrowserRouter(routes, {
    future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <DeviceApiProvider>
            <RouterProvider router={router} future={{v7_startTransition: true}} />
        </DeviceApiProvider>
    </React.StrictMode>
);