import { F } from 'ts-toolbelt';

export type NullableString = string | undefined | null;

/** Preserve const values while defining the datas shape. */
export const satisfies =
  <Type>() =>
  <Value extends Type>(value: F.Narrow<Value>) =>
    value;
