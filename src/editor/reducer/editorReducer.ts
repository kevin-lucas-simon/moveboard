import {levelReducer, LevelReducerActions, LevelReducerState} from "./levelReducer";
import {ValidationError} from "../../data/validator/Validator";
import {LevelValidator} from "../../data/validator/LevelValidator";
import {UUID} from "../../data/model/system/UUID";

export type EditorReducerState = LevelReducerState & {
    selected: UUID[],
    errors: ValidationError[],
}

export type EditorReducerActions = LevelReducerActions | {
    type: 'editor_select',
    payload: UUID,
} | {
    type: 'editor_deselect_all',
};

export function editorReducer(
    state: EditorReducerState,
    action: EditorReducerActions,
): EditorReducerState {
    switch (action.type) {
        case "editor_select":
            // selection can be any UUID, the corresponding items will check themselves
            return {
                ...state,
                selected: [action.payload],
            };
        case "editor_deselect_all":
            // deselect all items
            return {
                ...state,
                selected: [],
            };
        default:
            // validate level manipulation before applying them
            const newState = levelReducer(state, action);
            const errors = new LevelValidator().validate(newState.level);

            if (errors.length > 0) {
                return {
                    ...state,
                    errors: errors,
                }
            }

            return {
                ...state,
                ...newState,
                errors: [],
            };
    }
}