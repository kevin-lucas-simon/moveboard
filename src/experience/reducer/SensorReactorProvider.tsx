import React, {createContext, useContext, useEffect, useRef, useSyncExternalStore} from "react";
import {ElementID} from "../../data/model/element/ElementModel";
import {ChannelID, isLevelChannel} from "../../data/model/element/marker/ChannelID";
import {SensorStateStore} from "./SensorStateStore";

interface SensorScope {
    level: SensorStateStore;
    chunk: SensorStateStore | null;
}

const SensorScopeContext = createContext<SensorScope | null>(null);

export function LevelSensorProvider(props: { children: React.ReactNode }) {
    const storeRef = useRef<SensorStateStore | null>(null);
    if (!storeRef.current) {
        storeRef.current = new SensorStateStore();
    }

    return (
        <SensorScopeContext.Provider value={{ level: storeRef.current, chunk: null }}>
            {props.children}
        </SensorScopeContext.Provider>
    );
}

export function ChunkSensorProvider(props: { children: React.ReactNode }) {
    const scope = useContext(SensorScopeContext)!;
    const storeRef = useRef<SensorStateStore | null>(null);
    if (!storeRef.current) {
        storeRef.current = new SensorStateStore();
    }

    return (
        <SensorScopeContext.Provider value={{ ...scope, chunk: storeRef.current }}>
            {props.children}
        </SensorScopeContext.Provider>
    );
}

function useStore(channel: ChannelID | null): SensorStateStore | null {
    const scope = useContext(SensorScopeContext);

    if (!scope || !channel) {
        return null;
    }
    if (isLevelChannel(channel)) {
        return scope.level;
    }
    return scope.chunk;
}

export function useSensor(elementID: ElementID, channel: ChannelID | null): readonly [boolean, (isActive: boolean) => void] {
    const store = useStore(channel);

    useEffect(() => {
        if (!store || !channel) {
            return;
        }
        return store.registerSensor(elementID, channel);
    }, [elementID, channel, store]);

    const isActive = useSyncExternalStore(
        (callback) => {
            if (!store || !channel) {
                return () => {};
            }
            return store.subscribeSensorCallback(elementID, callback);
        },
        () => {
            if (!store || !channel) {
                return false;
            }
            return store.getSensorState(elementID);
        }
    );

    const setActiveState = (newState: boolean) => {
        if (!store || !channel) {
            return;
        }
        store.updateSensorState(elementID, newState);
    };

    return [isActive, setActiveState] as const;
}

export function useSensorReactor(channel: ChannelID | null): boolean {
    const store = useStore(channel);

    return useSyncExternalStore(
        (callback) => {
            if (!store || !channel) {
                return () => {};
            }
            return store.subscribeChannelCallback(channel, callback);
        },
        () => {
            if (!store || !channel) {
                return false;
            }
            return store.getChannelState(channel);
        }
    );
}
