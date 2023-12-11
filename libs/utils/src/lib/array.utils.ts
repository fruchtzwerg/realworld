export const includesObjectBy =
  <T, K extends keyof T>(tabs: T[], key: K) =>
  <U extends K>(tag: T[U] | string): tag is T[U] =>
    tabs.some((tab) => tab[key] === tag);
