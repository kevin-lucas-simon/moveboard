/**
 * Validates the given model object via validate() method.
 * Throws an error if the model is invalid.
 */
export interface Validator<T> {
    validate(model: T): ValidationError[];
}

/**
 * Represents a validation error with a message.
 */
export interface ValidationError {
    message: string;
}