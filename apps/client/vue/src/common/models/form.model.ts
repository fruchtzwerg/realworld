export type FormFields<T> = Record<keyof T, { type?: string; class: string; placeholder: string }>;
