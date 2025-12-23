import { BaseValidator } from './base.validator';

export class BypassValidator<T> extends BaseValidator<T> {
  override validate(entity: unknown): T {
    return entity as T;
  }

  override validateMany(entities: unknown[]): T[] {
    return entities as T[];
  }
}
