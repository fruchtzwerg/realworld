import { NotFoundError } from './errors';

/**
 * Assert that a value is present, otherwise throw a `NotFoundError`.
 * Used by shared handlers (`libs/api`) so they can stay framework-agnostic;
 * each server maps `NotFoundError` to its native error representation.
 */
export const assertFound = <T>(value: T | null | undefined, what: string): T => {
  if (value === null || value === undefined) throw new NotFoundError(what);
  return value;
};
