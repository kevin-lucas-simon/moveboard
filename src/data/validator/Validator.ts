/**
 * Validates the given model object via validate() method.
 * Throws an error if the model is invalid.
 */
export interface Validator<T> {
    validate(model: T): void;
}