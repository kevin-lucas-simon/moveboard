import {levelReducer, LevelReducerActions, LevelReducerState} from "./levelReducer";
import {ValidationError} from "../../data/validator/Validator";
import {LevelValidator} from "../../data/validator/LevelValidator";

export type EditorReducerState = LevelReducerState & {
    errors: ValidationError[],
}

export type EditorReducerActions = LevelReducerActions;

export function editorReducer(
    state: EditorReducerState,
    action: EditorReducerActions,
): EditorReducerState {
    const newState = levelReducer(state, action);
    const errors = new LevelValidator().validate(newState.level);

    if (errors.length > 0) {
        return {
            ...state,
            errors: errors,
        }
    }

    return {
        ...newState,
        errors: [],
    }
}