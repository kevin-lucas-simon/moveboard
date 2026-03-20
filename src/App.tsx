import {createBrowserRouter, RouterProvider} from "react-router";
import React from "react";
import {routes} from "./page/routes";

const router = createBrowserRouter(routes);

export function App() {
    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}
