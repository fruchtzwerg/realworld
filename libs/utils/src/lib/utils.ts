/** Check that a value is not null | undefined. */
export const isNotNull = <T>(value: T | null | undefined): value is T =>
  value != null;
