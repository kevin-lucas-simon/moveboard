import {LevelModel} from "../../data/model/world/LevelModel";
import React, {createContext, Dispatch, useContext, useReducer} from "react";
import {experienceReducer, ExperienceReducerActions, ExperienceReducerState} from "./experienceReducer";

const ExperienceContext = createContext<ExperienceReducerState|null>(null);
const ExperienceDispatcher = createContext<React.Dispatch<ExperienceReducerActions>|null>(null);

export type ExperienceProviderProps = {
    level: LevelModel,
    children: React.ReactNode,
}
export function ExperienceProvider(props: ExperienceProviderProps) {
    const [state, dispatcher] = useReducer(experienceReducer, {
        level: props.level,
        activeChunk: props.level.start,
    });

    return (
        <ExperienceContext.Provider value={state}>
            <ExperienceDispatcher.Provider value={dispatcher}>
                {props.children}
            </ExperienceDispatcher.Provider>
        </ExperienceContext.Provider>
    );
}

export function useExperienceState(): ExperienceReducerState {
    const context = useContext(ExperienceContext);
    if (!context) {
        throw new Error("useExperienceContext must be used within an ExperienceProvider");
    }

    return context;
}

export function useExperienceDispatcher(): Dispatch<ExperienceReducerActions> {
    const dispatcher = useContext(ExperienceDispatcher);
    if (!dispatcher) {
        throw new Error("useExperienceDispatcher must be used within an ExperienceProvider");
    }

    return dispatcher;
}