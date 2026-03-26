import {LevelModel} from "../../data/model/world/LevelModel";
import React, {createContext, Dispatch, useContext, useReducer} from "react";
import {levelStateReducer, LevelReducerActions, LevelReducerState} from "./levelStateReducer";
import {ChunkID} from "../../data/model/structure/spacial/ChunkModel";

const LevelStateContext = createContext<LevelReducerState|null>(null);
const LevelStateDispatcher = createContext<React.Dispatch<LevelReducerActions>|null>(null);

export function LevelStateProvider(props: {
    level: LevelModel,
    children: React.ReactNode,
    startChunkID?: ChunkID,
}) {
    const [state, dispatcher] = useReducer(levelStateReducer, {
        level: props.level,
        activeChunkID: props.startChunkID ?? props.level.start,
    });

    return (
        <LevelStateContext.Provider value={state}>
            <LevelStateDispatcher.Provider value={dispatcher}>
                {props.children}
            </LevelStateDispatcher.Provider>
        </LevelStateContext.Provider>
    );
}

export function useLevelState(): LevelReducerState {
    const context = useContext(LevelStateContext);
    if (!context) {
        throw new Error("useLevelStateContext must be used within an LevelStateProvider");
    }

    return context;
}

export function useLevelDispatcher(): Dispatch<LevelReducerActions> {
    const dispatcher = useContext(LevelStateDispatcher);
    if (!dispatcher) {
        throw new Error("useLevelStateDispatcher must be used within an LevelStateProvider");
    }

    return dispatcher;
}