/**
 * Framework-agnostic domain errors. Each server maps these to its native
 * HTTP error representation.
 */
export class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class NotFoundError extends Error {
  constructor(readonly what: string) {
    super(`${what} not found`);
    this.name = 'NotFoundError';
  }
}
