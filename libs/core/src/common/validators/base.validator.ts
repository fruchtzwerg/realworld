export abstract class BaseValidator<T> {
  // Define validation contracts for the domain
  abstract validate(entity: unknown, username?: string): T;
  abstract validateMany(entities: unknown[], username?: string): T[];
}
