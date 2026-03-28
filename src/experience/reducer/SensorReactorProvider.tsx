import React, {createContext, useContext, useEffect, useRef, useSyncExternalStore} from "react";
import {ElementID} from "../../data/model/element/ElementModel";

const ChunkStateContext = createContext<SensorStateStore|null>(null);

export function SensorReactorProvider(props: {
    children: React.ReactNode;
}) {
    const storeRef = useRef<SensorStateStore|null>(null)
    if (!storeRef.current) {
        storeRef.current = new SensorStateStore();
    }

    return (
        <ChunkStateContext.Provider value={storeRef.current}>
            {props.children}
        </ChunkStateContext.Provider>
    )
}

export function useSensor(elementID: ElementID): readonly [boolean, (isActive: boolean) => void] {
    const store = useContext(ChunkStateContext);
    if (!store) {
        throw new Error("useChunkSensor must be used within a ChunkStateProvider");
    }

    useEffect(() => {
        return store.registerSensor(elementID);
    }, [elementID, store])

    const isActive = useSyncExternalStore(
        (callback) => store.subscribeSensorCallback(elementID, callback),
        () => store.getSensorState(elementID) ?? false,
    );

    const setActiveState = (isActive: boolean) => {
        store.updateSensorState(elementID, isActive);
    }

    return [isActive, setActiveState] as const;
}

export function useSensorReactor(): boolean {
    const store = useContext(ChunkStateContext);
    if (!store) {
        throw new Error("useChunkReactor must be used within a ChunkReactorProvider");
    }

    return useSyncExternalStore(
        (listener) => store.subscribeReactorCallback(listener),
        () => store.getReactorState(),
    );
}

class SensorStateStore {
    private sensorStates: Map<ElementID, boolean> = new Map();
    private sensorListeners: Map<ElementID, Set<() => void>> = new Map();
    private subscriber: Set<() => void> = new Set();

    registerSensor(elementID: ElementID): () => void {
        this.sensorStates.set(elementID, false);
        this.sensorListeners.set(elementID, new Set())
        return () => {
            this.sensorStates.delete(elementID)
            this.sensorListeners.delete(elementID)
        };
    }

    subscribeSensorCallback(elementID: ElementID, callback: () => void): () => void {
        const subscriber = this.sensorListeners.get(elementID);
        if (!subscriber) {
            return () => {};
        }
        subscriber.add(callback);
        return () => subscriber.delete(callback);
    }

    subscribeReactorCallback(callback: () => void) {
        this.subscriber.add(callback);
        return () => this.subscriber.delete(callback);
    }

    updateSensorState(elementID: ElementID, newSensorState: boolean) {
        if (!this.sensorStates.has(elementID)) {
            return;
        }

        const oldSensorState = this.sensorStates.get(elementID);
        const oldReactorState = this.isEverySensorActive();

        this.sensorStates.set(elementID, newSensorState);

        const newReactorValue = this.isEverySensorActive();

        if (oldSensorState !== newSensorState) {
            const listeners = this.sensorListeners.get(elementID);
            listeners?.forEach(listener => listener());
        }

        if (oldReactorState !== newReactorValue) {
            this.subscriber.forEach(listener => listener());
        }
    }

    getSensorState(elementID: ElementID) {
        return this.sensorStates.get(elementID);
    }

    getReactorState() {
        return this.isEverySensorActive();
    }

    private isEverySensorActive(): boolean {
        if (this.sensorStates.size === 0) {
            return false;
        }
        for (const state of this.sensorStates.values()) {
            if (!state) {
                return false;
            }
        }
        return true;
    }
}