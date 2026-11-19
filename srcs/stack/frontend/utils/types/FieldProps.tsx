export type FieldProps = {
    id: string;
    name: string;
    type?: string;
    label: string;
    disabled: boolean;
    placeholder?: string;
    as: string;
    options?: { label: string; value: string }[]; // <-- Optionnel pour rendre le Select générique
};