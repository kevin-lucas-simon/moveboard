import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React from "react";
import routeConfig from "./config/routeConfig";

const router = createBrowserRouter(routeConfig, {
    future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
    },
});

export function App() {
    return (
        <React.StrictMode>
            <RouterProvider router={router} future={{v7_startTransition: true}} />
        </React.StrictMode>
    );
}
