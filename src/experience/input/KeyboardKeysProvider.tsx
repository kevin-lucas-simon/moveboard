import React, {createContext, useContext, useEffect, useState} from "react";

const KeyboardKeysContext = createContext<string[]>([]);

export type KeyboardKeysContextType = {
    children: React.ReactNode,
}
export function KeyboardKeysProvider(props: KeyboardKeysContextType) {
    const keysDown = useKeyboardControlsApi();

    return (
        <KeyboardKeysContext.Provider value={keysDown}>
            {props.children}
        </KeyboardKeysContext.Provider>
    );
}

/**
 * Hook to access the keyboard keys
 * @return
 */
export function useKeyboardKeysContext(): string[] {
    return useContext(KeyboardKeysContext);
}

/**
 * Hook to access the keyboard controls
 * @return keysDown
 */
function useKeyboardControlsApi() {
    const [keysDown, setKeysDown]
        = useState<string[]>([])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!keysDown.includes(event.key)) {
                setKeysDown([...keysDown, event.key])
            }
        }
        const handleKeyUp = (event: KeyboardEvent) => {
            if (keysDown.includes(event.key)) {
                setKeysDown(keysDown.filter(key => key !== event.key))
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [keysDown])

    return keysDown;
}