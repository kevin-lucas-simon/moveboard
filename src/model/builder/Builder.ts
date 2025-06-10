export interface Builder<T> {
    /**
     * Returns fully built model object.
     * @returns The built model object.
     */
    build(): T;
}
