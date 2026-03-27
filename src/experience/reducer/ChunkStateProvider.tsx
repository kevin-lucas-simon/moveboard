import React, {createContext, useContext, useEffect, useReducer} from "react";
import {ElementID} from "../../data/model/element/ElementModel";

type ChunkReducerState = {
    sensors: Record<ElementID, boolean>;
    isAllSensorsActive: boolean,
};

type ChunkReducerActions = {
    type: 'register_sensor',
    payload: {
        elementID: ElementID,
    }
} | {
    type: 'set_sensor_state',
    payload: {
        elementID: ElementID,
        isSensorActive: boolean
    }
}

function chunkStateReducer(
    state: ChunkReducerState,
    action: ChunkReducerActions,
): ChunkReducerState {
    switch (action.type) {
        case "register_sensor": {
            if (state.sensors[action.payload.elementID] !== undefined) {
                return state;
            }

            return {
                ...state,
                sensors: {
                    ...state.sensors,
                    [action.payload.elementID]: false,
                },
                isAllSensorsActive: false,
            }
        }
        case "set_sensor_state": {
            if (state.sensors[action.payload.elementID] === undefined) {
                return state;
            }

            const nextSensors = {
                ...state.sensors,
                [action.payload.elementID]: action.payload.isSensorActive,
            }

            const sensorValues = Object.values(nextSensors);
            const isComplete = sensorValues.length > 0 && sensorValues.every(value => value === true);

            return {
                ...state,
                sensors: nextSensors,
                isAllSensorsActive: isComplete,
            }
        }
    }
}

const ChunkStateContext = createContext<ChunkReducerState|null>(null);
const ChunkStateDispatcher = createContext<React.Dispatch<ChunkReducerActions>|null>(null);

export function ChunkStateProvider(props: {
    children: React.ReactNode;
}) {
    // TODO active chunk muss irgendwie hier sein kp lol
    const [state, reducer] = useReducer(chunkStateReducer, {
        sensors: {},
        isAllSensorsActive: false,
    });

    return (
        <ChunkStateContext.Provider value={state}>
            <ChunkStateDispatcher.Provider value={reducer}>
                {props.children}
            </ChunkStateDispatcher.Provider>
        </ChunkStateContext.Provider>
    )
}

export function useChunkSensor(elementID: ElementID): readonly [boolean, (isActive: boolean) => void] {
    const state = useContext(ChunkStateContext);
    const dispatcher = useContext(ChunkStateDispatcher);

    useEffect(() => {
        if (!dispatcher) {
            return;
        }
        dispatcher({
            type: "register_sensor",
            payload: {
                elementID: elementID,
            }
        })
    }, [dispatcher, elementID]);

    const isActive = state?.sensors[elementID] ?? false;

    const setActiveState = (isActive: boolean) => {
        if (!dispatcher) {
            throw new Error(useChunkSensor.name + " must be used within an " + chunkStateReducer.name);
        }
        dispatcher({
            type: 'set_sensor_state',
            payload: {
                elementID: elementID,
                isSensorActive: isActive
            },
        });
    };

    return [isActive, setActiveState] as const;
}

export function useChunkReactor(): boolean {
    const state = useContext(ChunkStateContext);

    return state?.isAllSensorsActive ?? false as const;
}