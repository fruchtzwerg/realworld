type Obj = Record<PropertyKey, unknown>;

/** Iterates an objects entries in a typesafe way. */
export const objectEntries = <T extends Obj, K extends keyof T>(obj: T): [K, T[K]][] =>
  Object.entries(obj) as any;

/** Removes the first level of null | undefined. */
export const shallowSparse = <T extends Obj>(obj: T): T =>
  objectEntries(obj).reduce((acc, [key, value]) => {
    if (value != null) return acc;

    delete acc[key];

    return acc;
  }, obj);

export const isObjectEqual = <T>(a: T, b: T) => {
  return a === b || JSON.stringify(a) === JSON.stringify(b);
};
