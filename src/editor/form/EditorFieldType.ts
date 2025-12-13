export type EditorFieldType<T> = {
    value: T;
    onChange: (newValue: T) => void;
    className?: string;
}
