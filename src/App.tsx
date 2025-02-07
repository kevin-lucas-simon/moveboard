import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {DeviceMotionProvider} from "./component/api/DeviceMotionProvider";
import React, {useState} from "react";
import routes from "./page/config/routes";
import {StartupModal} from "./component/dialog/StartupModal";
import {KeyboardKeysProvider} from "./component/api/KeyboardKeysProvider";

const router = createBrowserRouter(routes, {
    future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
    },
});

export function App() {
    const [isGranted, setGranted] = useState<boolean>(false);

    return (
        <React.StrictMode>
            <StartupModal isStarted={isGranted} onStart={() => setGranted(true)} />

            <DeviceMotionProvider isGranted={isGranted}>
                <KeyboardKeysProvider>
                    <RouterProvider router={router} future={{v7_startTransition: true}} />
                </KeyboardKeysProvider>
            </DeviceMotionProvider>
        </React.StrictMode>
    );
}
