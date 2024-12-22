import {useEffect, useState} from "react";

/**
 * Hook to store and load data from local storage
 * @param storageName name of the storage in local storage
 * @param storageDefault default value of the storage if it is not set
 */
export function useLocalStorage<StorageObject>(
    storageName: string,
    storageDefault: StorageObject
) {
    const [item, setItem] = useState<StorageObject>(storageDefault);

    // load from local storage
    useEffect(() => {
        try {
            const rawItems = localStorage.getItem(storageName);
            if (rawItems === null) {
                localStorage.setItem(storageName, JSON.stringify(storageDefault));
                return;
            }
            setItem(JSON.parse(rawItems));
        } catch (e) {
            throw new Error("Could not load from local storage with type " + storageName);
        }
    }, [storageName, storageDefault]);

    // save to local storage when items change
    useEffect(() => {
        if (item === storageDefault) {
            return;
        }
        localStorage.setItem(storageName, JSON.stringify(item));
    }, [storageName, storageDefault, item]);

    return [item, setItem] as const;
}